import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { paymentLimiter } from '../middlewares/rateLimiter';
import { createOrderSchema, verifyPaymentSchema } from '../validators/payment.validator';

const router = Router();
const controller = new PaymentController();

router.post('/create-order', authenticate, paymentLimiter, validate(createOrderSchema), controller.createOrder.bind(controller));
router.post('/verify', authenticate, paymentLimiter, validate(verifyPaymentSchema), controller.verifyPayment.bind(controller));
router.post('/webhook', controller.webhook.bind(controller));

export default router;
