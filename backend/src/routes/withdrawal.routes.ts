import { Router } from 'express';
import { requestWithdrawalController, getWithdrawals } from '../controllers/withdrawal.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { withdrawalRequestSchema } from '../validators/withdrawal.validator';

const router = Router();

router.use(authenticate);

router.post('/request', validate(withdrawalRequestSchema), requestWithdrawalController);
router.get('/', getWithdrawals);

export default router;
