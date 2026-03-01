import { Router } from 'express';
import { getPlans, createOrder, verifyPayment, getWalletTransactions } from '../controllers/wallet.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createOrderSchema, verifyPaymentSchema } from '../validators/wallet.validator';

const router = Router();

router.get('/plans', getPlans);

router.use(authenticate);

router.post('/create-order', validate(createOrderSchema), createOrder);
router.post('/verify-payment', validate(verifyPaymentSchema), verifyPayment);
router.get('/transactions', getWalletTransactions);

export default router;
