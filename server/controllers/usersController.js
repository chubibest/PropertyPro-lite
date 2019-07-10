import {
  fetchUser, createUser, fetchUserByEmail, changePassword
} from '../modelController/user';
import { hashPassword, matchPassword, generateToken } from '../helpers/helper';
import { successResponse, errorResponse } from './response';
import resetPass from '../passwordGen/passwordGen';
import sendNewPass from '../sendgrid/resetpassmail';

export const createUsers = async (req, res) => {
  const { body: { username, password } } = req;
  try {
    const existingUser = await fetchUser(username);
    if (existingUser) {
      return errorResponse(res, `username ${username} alerady exists`, 409);
    }
    req.body.password = await hashPassword(password);
    const user = await createUser(req.body);
    user.token = generateToken(user);
    successResponse(res, user, 201);
  } catch (e) {
    if (e.constraint === 'users_email_key') {
      return errorResponse(res, 'email already exists', 500);
    }
    return errorResponse(res, 'something went wrong', 500);
  }
};

export const login = async (req, res) => {
  const { body: { password, username } } = req;
  try {
    const user = await fetchUser(username);
    if (!user) {
      return errorResponse(res, `${username} does not exist`);
    }
    const match = matchPassword(password, user.password);
    if (!match) {
      return errorResponse(res, 'Incorrect Password', 401);
    }
    delete user.password;
    user.token = generateToken(user.id);
    return successResponse(res, user);
  } catch (e) {
    return errorResponse(res, 'something went wrong', 500);
  }
};

export const changePass = async ({ body }, res) => {
  const { oldpass, newpass } = body;
  const { email } = res.locals;
  try {
    const { password } = await fetchUserByEmail(email);
    const match = matchPassword(oldpass, password);
    if (match) {
      const newPass = await hashPassword(newpass);
      await changePassword(newPass, email);
      return res.status(204).send();
    }
    return errorResponse(res, 'Forbidden', 403);
  } catch (e) {
    errorResponse(res, 'Something went wrong', 500);
  }
};

export const resetpasscontroller = async ({ body, params }, res, next) => {
  const { user_email: email } = params;
  res.locals.email = email;
  if (body.oldpass) {
    return next();
  }
  try {
    const password = resetPass();
    const hash = await hashPassword(password);
    await changePassword(hash, email);
    await sendNewPass(email, password);
    res.status(204).send();
  } catch (e) {
    errorResponse(res, 'Something went went wrong', 500);
  }
};
