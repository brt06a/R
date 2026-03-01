import { Router } from 'express';
import { getMessages, markMessageRead } from '../controllers/message.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getMessages);
router.patch('/:id/read', markMessageRead);

export default router;
