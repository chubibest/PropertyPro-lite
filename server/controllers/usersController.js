import intformat from 'biguint-format';
import FlakeId from 'flake-idgen';
import { hashPassword, matchPassword, generateToken } from '../helpers/helper';
import { successResponse, errorResponse } from './response';
import resetPass from '../passwordGen/passwordGen';
import sendNewPass from '../sendgrid/resetpassmail';
import {
  getUserQuery, changePassQuery
} from '../queries/userQueries';
import insertQuery from '../queries/commonInsert';
import query from '../configurations/dbconfig';

const genId = new FlakeId();

const getResBody = ({
  password, phone_number: pn, address, is_admin: is, ...rest
}) => (
  rest
);


export const createUsers = async ({ body }, res) => {
  const { email, password } = body;
  try {
    const [existingUser] = await query(getUserQuery(email));
    if (existingUser) {
      return errorResponse(res, 'email already exists', 409);
    }
    body.password = await hashPassword(password);
    body.id = intformat(genId.next(), 'dec');
    const [user] = await query(insertQuery('users', body));
    user.token = await generateToken(user);
    const resBody = getResBody(user);
    successResponse(res, resBody, 201);
  } catch (e) {
    return errorResponse(res, e, 500);
  }
};

export const login = async ({ body }, res) => {
  const { password, email } = body;
  try {
    const [user] = await query(getUserQuery(email));
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
    const [user] = await query(getUserQuery(email));
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
