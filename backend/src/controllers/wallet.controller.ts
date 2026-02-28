import { Response, NextFunction } from 'express';
import { WalletRepository } from '../repositories/wallet.repository';
import { AuthenticatedRequest } from '../middlewares/auth';
import { sendSuccess } from '../utils/response';

const walletRepo = new WalletRepository();

export class WalletController {
  async getTransactions(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await walletRepo.findByUserId(req.user!.userId, page, limit);
      sendSuccess(res, result.transactions, undefined, 200, {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      });
    } catch (error) {
      next(error);
    }
  }
}
