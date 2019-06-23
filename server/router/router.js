import { Router } from 'express';
import dotenv from 'dotenv';
import { createUser, login } from '../controllers/usersController';
import {
  createAd, updateAd, changeStatus, deleteAd, getAllAds, getAdById, getByType
} from '../controllers/propertyController';
import auth from '../helpers/authenticateUser';
// import verifyToken from '../helpers/helper';
dotenv.config();

const router = new Router();

router.post('/api/v1/auth/signup', createUser);
router.post('/api/v1/auth/signin', login);
router.post('/api/v1/property', auth, createAd);
router.patch('/api/v1/property/:property_id', auth, updateAd);
router.patch('/api/v1/property/:property_id/sold', auth, changeStatus);
router.delete('/api/v1/property/:property_id', auth, deleteAd);
router.get('/api/v1/property', auth, getByType, getAllAds);
router.get('/api/v1/property/:property_id', auth, getAdById);

export default router;
