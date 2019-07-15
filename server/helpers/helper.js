import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const hashPassword = password => bcrypt.hash(password, 8);

const matchPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

const generateToken = ({ id, email }) => jwt.sign(
  {
    id,
    email
  },
  process.env.SECRET, { expiresIn: '7d' }
);


const verifyToken = token => jwt.verify(token, process.env.SECRET);

export {
  hashPassword, matchPassword, generateToken, verifyToken
};
