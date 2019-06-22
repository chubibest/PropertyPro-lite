import UserModel from '../models/models';
import { hashPassword, matchPassword, generateToken } from '../helpers/helper';


export const createUser = async (req, res) => {
  const { body: { username, password } } = req;
  if (UserModel.fetchUser(username)) {
    return res.status(409).send({
      status: 'error',
      error: `username ${username} alerady exists`
    });
  }

  req.body.password = await hashPassword(password);
  const user = UserModel.createUser(req.body);
  user.token = generateToken(user.id);
  res.status(200).send({
    status: 'success',
    data: user
  });
};

export const login = async (req, res) => {
  const { body: { password, username } } = req;
  const user = UserModel.fetchUser(username);
  if (!user) {
    return res.status(404).send({
      status: 'error',
      error: `${username} does not exist`
    });
  }

  const match = await matchPassword(password, UserModel.fetchPassword(username));
  if (match) {
    user.token = generateToken(user.id);
    return res.status(200).send({
      status: 'success',
      data: user
    });
  }
  if (!match) {
    return res.status(401).send({
      status: 'error',
      error: 'Incorrect password'
    });
  }
};
