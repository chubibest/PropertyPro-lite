import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hashPassword = password => bcrypt.hash(password, 8);

const matchPassword = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

const generateToken = id => jwt.sign(
  {
    id
  },
  process.env.SECRET, { expiresIn: '7d' }
);


const verifyToken = token => jwt.verify(token, process.env.SECRET);

export {
  hashPassword, matchPassword, generateToken, verifyToken
};
