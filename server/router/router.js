import { Router } from 'express';
import dotenv from 'dotenv';
import { createUser, login } from '../controllers/controller';

dotenv.config();

const router = new Router();

router.post('/api/v1/auth/signup', createUser);
router.post('/api/v1/auth/signin', login);
// router.post('/api/v1/property')
// router.patch(/api/v1/property/:property-id)
// router.patch(/api/v1/property/:property-id/sold)
// router.delete('/api/v1/property/:property-id)
// router.get('/api/v1/property/:property-id')
//  router.get('/api/v1/property/:property-id?type=propertyType)

export default router;
