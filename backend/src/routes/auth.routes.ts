import { Router } from 'express';
import { signup, verifyOtp, login, refreshToken, logout, resendOtpController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { signupSchema, verifyOtpSchema, loginSchema } from '../validators/auth.validator';
import { authRateLimiter } from '../middleware/rateLimiter';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/signup', authRateLimiter, validate(signupSchema), signup);
router.post('/verify-otp', authRateLimiter, validate(verifyOtpSchema), verifyOtp);
router.post('/login', authRateLimiter, validate(loginSchema), login);
router.post('/refresh', refreshToken);
router.post('/logout', authenticate, logout);
router.post('/resend-otp', authRateLimiter, resendOtpController);

export default router;
