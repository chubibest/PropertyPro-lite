import { Router } from 'express';
import dotenv from 'dotenv';
import { createUser, login } from '../controllers/usersController';
import { createAd, updateAd } from '../controllers/propertyController';
import auth from '../helpers/authenticateUser';
// import verifyToken from '../helpers/helper';
dotenv.config();

const router = new Router();

router.post('/api/v1/auth/signup', createUser);
router.post('/api/v1/auth/signin', login);
router.post('/api/v1/property', auth, createAd);
router.patch('/api/v1/property/:property_id', auth, updateAd);
// router.patch('/api/v1/property/:property-id/sold')
// router.delete('/api/v1/property/:property-id)
// router.get('/api/v1/property/:property-id')
//  router.get('/api/v1/property/:property-id?type=propertyType)

export default router;
