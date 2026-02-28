import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { sendMessageSchema } from '../validators/message.validator';

const router = Router();
const controller = new MessageController();

router.post('/', authenticate, validate(sendMessageSchema), controller.send.bind(controller));
router.get('/conversations', authenticate, controller.getConversationList.bind(controller));
router.get('/conversations/:userId', authenticate, controller.getConversation.bind(controller));
router.post('/read', authenticate, controller.markAsRead.bind(controller));
router.get('/unread-count', authenticate, controller.getUnreadCount.bind(controller));

export default router;
