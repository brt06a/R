import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { PrismaClient } from '@prisma/client';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';

const prisma = new PrismaClient();

export const getMessages = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { userId: req.user!.userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.message.count({ where: { userId: req.user!.userId } }),
    ]);

    sendPaginated(res, 'Messages fetched successfully', messages, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const markMessageRead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const message = await prisma.message.findFirst({
      where: { id: req.params.id, userId: req.user!.userId },
    });

    if (!message) {
      res.status(404).json({ success: false, message: 'Message not found' });
      return;
    }

    await prisma.message.update({
      where: { id: req.params.id },
      data: { isRead: true },
    });

    sendSuccess(res, 'Message marked as read');
  } catch (error) {
    next(error);
  }
};
