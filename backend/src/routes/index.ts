import { Router } from 'express';
import authRoutes from './auth.routes';
import ideaRoutes from './idea.routes';
import paymentRoutes from './payment.routes';
import withdrawalRoutes from './withdrawal.routes';
import categoryRoutes from './category.routes';
import messageRoutes from './message.routes';
import walletRoutes from './wallet.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/ideas', ideaRoutes);
router.use('/payments', paymentRoutes);
router.use('/withdrawals', withdrawalRoutes);
router.use('/categories', categoryRoutes);
router.use('/messages', messageRoutes);
router.use('/wallet', walletRoutes);

export default router;
