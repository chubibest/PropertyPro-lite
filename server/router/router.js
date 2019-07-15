import { Router } from 'express';
import dotenv from 'dotenv';
import {
  createUsers, login, changePass, resetpasscontroller
} from '../controllers/usersController';
import { validateSignup, validateSignin, validatePassChange } from '../validators/validateUser';
import { validatePostAd, validateUpdateAd, validateFlag } from '../validators/validateProperty';
import {
  createAds, updateAd, changeStatus, deletePropertyAd, getAllAds, getAdById, getByType, flag
} from '../controllers/propertyController';
import auth from '../middleware/authmiddleware';

dotenv.config();

const router = new Router();

router.post('/auth/signup', validateSignup, createUsers);
router.post('/auth/signin', validateSignin, login);
router.post('/property', validatePostAd, auth, createAds);
router.patch('/property/:property_id', validateUpdateAd, auth, updateAd);
router.patch('/property/:property_id/sold', auth, changeStatus);
router.delete('/property/:property_id', auth, deletePropertyAd);
router.get('/property', auth, getByType, getAllAds);
router.get('/property/:property_id', auth, getAdById);
router.post('/auth/:user_email/reset_password', resetpasscontroller, validatePassChange, auth, changePass);
router.post('/property/:property_id', validateFlag, auth, flag);

export default router;
