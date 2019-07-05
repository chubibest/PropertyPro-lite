import { Router } from 'express';
import dotenv from 'dotenv';
import { createUser, login } from '../controllers/usersController';
import { validateSignup, validateSignin } from '../validators/validateUser';
import { validatePostAd, validateUpdateAd } from '../validators/validateProperty';
import {
  createAd, updateAd, changeStatus, deleteAd, getAllAds, getAdById, getByType
} from '../controllers/propertyController';
import auth from '../middleware/authmiddleware';

dotenv.config();

const router = new Router();

router.post('/api/v1/auth/signup', validateSignup, createUser);
router.post('/api/v1/auth/signin', validateSignin, login);
router.post('/api/v1/property', validatePostAd, auth, createAd);
router.patch('/api/v1/property/:property_id', validateUpdateAd, auth, updateAd);
router.patch('/api/v1/property/:property_id/sold', auth, changeStatus);
router.delete('/api/v1/property/:property_id', auth, deleteAd);
router.get('/api/v1/property', auth, getByType, getAllAds);
router.get('/api/v1/property/:property_id', auth, getAdById);
// POST /auth/<:user-email>/reset_password
// Reset user’s password.

export default router;
