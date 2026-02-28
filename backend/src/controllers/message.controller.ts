import { Response, NextFunction } from 'express';
import { MessageService } from '../services/message.service';
import { AuthenticatedRequest } from '../middlewares/auth';
import { sendSuccess } from '../utils/response';

const messageService = new MessageService();

export class MessageController {
  async send(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const message = await messageService.sendMessage(req.user!.userId, req.body);
      sendSuccess(res, message, 'Message sent', 201);
    } catch (error) {
      next(error);
    }
  }

  async getConversation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const result = await messageService.getConversation(
        req.user!.userId,
        req.params.userId,
        page,
        limit
      );
      sendSuccess(res, result.messages, undefined, 200, {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      });
    } catch (error) {
      next(error);
    }
  }

  async getConversationList(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const conversations = await messageService.getConversationList(req.user!.userId);
      sendSuccess(res, conversations);
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await messageService.markAsRead(req.body.messageIds, req.user!.userId);
      sendSuccess(res, null, 'Messages marked as read');
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const count = await messageService.getUnreadCount(req.user!.userId);
      sendSuccess(res, { count });
    } catch (error) {
      next(error);
    }
  }
}
