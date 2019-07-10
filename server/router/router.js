import { Router } from 'express';
import dotenv from 'dotenv';
import {
  createUsers, login, changePass, resetpasscontroller
} from '../controllers/usersController';
import { validateSignup, validateSignin, validatePassChange } from '../validators/validateUser';
import { validatePostAd, validateUpdateAd } from '../validators/validateProperty';
import {
  createAds, updateAd, changeStatus, deletePropertyAd, getAllAds, getAdById, getByType
} from '../controllers/propertyController';
import auth from '../middleware/authmiddleware';

dotenv.config();

const router = new Router();

router.post('/api/v1/auth/signup', validateSignup, createUsers);
router.post('/api/v1/auth/signin', validateSignin, login);
router.post('/api/v1/property', validatePostAd, auth, createAds);
router.patch('/api/v1/property/:property_id', validateUpdateAd, auth, updateAd);
router.patch('/api/v1/property/:property_id/sold', auth, changeStatus);
router.delete('/api/v1/property/:property_id', auth, deletePropertyAd);
router.get('/api/v1/property', auth, getByType, getAllAds);
router.get('/api/v1/property/:property_id', auth, getAdById);
router.post('/auth/:user_email/reset_password', resetpasscontroller, validatePassChange, auth, changePass);


export default router;
