import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { authLimiter } from '../middlewares/rateLimiter';
import { registerSchema, loginSchema, verifyEmailSchema, verifyOtpSchema } from '../validators/auth.validator';

const router = Router();
const controller = new AuthController();

router.post('/register', authLimiter, validate(registerSchema), controller.register.bind(controller));
router.post('/login', authLimiter, validate(loginSchema), controller.login.bind(controller));
router.post('/verify-email', validate(verifyEmailSchema), controller.verifyEmail.bind(controller));
router.post('/refresh-token', controller.refreshToken.bind(controller));
router.post('/logout', authenticate, controller.logout.bind(controller));
router.get('/profile', authenticate, controller.getProfile.bind(controller));
router.post('/send-otp', authLimiter, controller.sendOtp.bind(controller));
router.post('/verify-otp', authLimiter, validate(verifyOtpSchema), controller.verifyOtp.bind(controller));

export default router;
