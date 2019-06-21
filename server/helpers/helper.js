import bcrypt from 'bcrypt';

const hashPassword = password => bcrypt.hash(password, 8);

const matchPassword = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export { hashPassword, matchPassword };
