import { verifyToken } from '../helpers/helper';


export default async ({ body, headers: { authorization } }, res, next) => {
  try {
    const token = body.token || authorization.replace('Bearer ', '');
    const { id } = await verifyToken(token);

    body.owner = id;
    next();
  } catch (error) {
    res.status(403).json({ status: 'error', error: 'Invalid token' });
  }
};
