import { Router } from 'express';
import { WithdrawalController } from '../controllers/withdrawal.controller';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createWithdrawalSchema } from '../validators/withdrawal.validator';

const router = Router();
const controller = new WithdrawalController();

router.post('/', authenticate, validate(createWithdrawalSchema), controller.create.bind(controller));
router.get('/', authenticate, controller.list.bind(controller));
router.get('/:id', authenticate, controller.getById.bind(controller));
router.post('/:id/cancel', authenticate, controller.cancel.bind(controller));

export default router;
