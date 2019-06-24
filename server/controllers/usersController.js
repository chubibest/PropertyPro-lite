import users from '../models/Users';
import { hashPassword, matchPassword, generateToken } from '../helpers/helper';
import { successResponse, errorResponse } from './response';


export const createUser = async (req, res) => {
  const { body: { username, password } } = req;
  if (users.fetchUser(username)) {
    return errorResponse(res, `username ${username} alerady exists`, 409);
  }

  req.body.password = await hashPassword(password);
  const user = users.createUser(req.body);
  user.token = generateToken(user.id);
  successResponse(res, user);
};

export const login = async (req, res) => {
  const { body: { password, username } } = req;
  const user = users.fetchUser(username);
  if (!user) {
    return errorResponse(res, `${username} does not exist`);
  }
  const match = await matchPassword(password, users.fetchPassword(username));
  if (match) {
    user.token = generateToken(user.id);
    return successResponse(res, user);
  }
  if (!match) {
    errorResponse(res, 'Incorrect Password', 401);
  }
};
