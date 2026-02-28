import { Router } from 'express';
import { WalletController } from '../controllers/wallet.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();
const controller = new WalletController();

router.get('/transactions', authenticate, controller.getTransactions.bind(controller));

export default router;
