/* eslint-disable camelcase */
import intformat from 'biguint-format';
import FlakeId from 'flake-idgen';
import { hashPassword, matchPassword, generateToken } from '../helpers/helper';
import { successResponse, errorResponse } from './response';
import resetPass from '../passwordGen/passwordGen';
import sendNewPass from '../sendgrid/resetpassmail';
import {
  getUserQuery, getByEmail, changePassQuery
} from '../queries/userQueries';
import insertQuery from '../queries/commonInsert';
import query from '../configurations/dbconfig';

const genId = new FlakeId();

const getResBody = ({
  username, password, phonenumber, address, is_admin, ...rest
}) => rest;


export const createUsers = async (req, res) => {
  const { body: { username: userName, password: pass } } = req;
  try {
    const [existingUser] = await query(getUserQuery(userName));
    if (existingUser) {
      return errorResponse(res, 'username already exists', 409);
    }
    req.body.password = await hashPassword(pass);
    req.body.id = intformat(genId.next(), 'dec');
    const [user] = await query(insertQuery('users', req.body));
    user.token = await generateToken(user);
    const resBody = getResBody(user);
    successResponse(res, resBody, 201);
  } catch (e) {
    if (e.constraint === 'users_email_key') {
      return errorResponse(res, 'email already exists', 409);
    }
    return errorResponse(res, e, 500);
  }
};

export const login = async (req, res) => {
  const { body: { password, username: userName } } = req;
  try {
    const [user] = await query(getUserQuery(userName));
    if (!user) {
      return errorResponse(res, 'user does not exist');
    }

    const {
      password: savedPass
    } = user;
    const match = matchPassword(password, savedPass);
    if (!match) {
      return errorResponse(res, 'Incorrect Password', 401);
    }
    user.token = await generateToken(user);
    const resBody = getResBody(user);
    return successResponse(res, resBody);
  } catch (e) {
    return errorResponse(res, 'something went wrong', 500);
  }
};

export const changePass = async ({ body }, res) => {
  const { oldpass, newpass } = body;
  const { email } = res.locals;
  try {
    const [user] = await query(getByEmail(email));
    const { password } = user;
    const match = matchPassword(oldpass, password);
    if (match) {
      const newPass = await hashPassword(newpass);
      await query(changePassQuery(newPass, email));
      return res.status(204).send();
    }
    return errorResponse(res, 'Forbidden', 403);
  } catch (e) {
    errorResponse(res, e, 500);
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
    await query(changePassQuery(hash, email));
    await sendNewPass(email, password);
    res.status(204).send();
  } catch (e) {
    errorResponse(res, e, 500);
  }
};
