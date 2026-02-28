import { Router } from 'express';
import { getProfile, getDashboard, updateProfile, updatePassword } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.get('/dashboard', getDashboard);
router.patch('/profile', updateProfile);
router.patch('/password', updatePassword);

export default router;
