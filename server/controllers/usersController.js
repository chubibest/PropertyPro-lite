import { fetchUser, createUser } from '../modelController/user';
import { hashPassword, matchPassword, generateToken } from '../helpers/helper';
import { successResponse, errorResponse } from './response';


export const createUsers = async (req, res) => {
  const { body: { username, password } } = req;
  try {
    const existingUser = await fetchUser(username);
    if (existingUser) {
      return errorResponse(res, `username ${username} alerady exists`, 409);
    }
    req.body.password = await hashPassword(password);
    const user = await createUser(req.body);
    user.token = generateToken(user.id);
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
