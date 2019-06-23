import { verifyToken } from './helper';


export default async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return res.status(403).send({
      status: 'error',
      error: 'Please provide a token'
    });
  }
  try {
    const { id } = await verifyToken(token);
    req.body.id = id;
    next();
  } catch (error) {
    res.status(403).json({ status: 'error', error: 'No token' });
  }
};
