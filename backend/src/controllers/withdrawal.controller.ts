import { Response, NextFunction } from 'express';
import { WithdrawalService } from '../services/withdrawal.service';
import { AuthenticatedRequest } from '../middlewares/auth';
import { sendSuccess } from '../utils/response';

const withdrawalService = new WithdrawalService();

export class WithdrawalController {
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const withdrawal = await withdrawalService.createWithdrawal(req.user!.userId, req.body);
      sendSuccess(res, withdrawal, 'Withdrawal request created', 201);
    } catch (error) {
      next(error);
    }
  }

  async list(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await withdrawalService.getWithdrawals(req.user!.userId, page, limit);
      sendSuccess(res, result.withdrawals, undefined, 200, {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const withdrawal = await withdrawalService.getWithdrawal(req.params.id, req.user!.userId);
      sendSuccess(res, withdrawal);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const withdrawal = await withdrawalService.cancelWithdrawal(req.params.id, req.user!.userId);
      sendSuccess(res, withdrawal, 'Withdrawal cancelled');
    } catch (error) {
      next(error);
    }
  }
}
