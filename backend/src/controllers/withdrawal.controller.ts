import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { requestWithdrawal, getWithdrawalHistory } from '../services/withdrawal.service';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';

export const requestWithdrawalController = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { amount, bankDetails } = req.body;
    const withdrawal = await requestWithdrawal(req.user!.userId, amount, bankDetails);
    sendSuccess(res, 'Withdrawal request submitted successfully', withdrawal, 201);
  } catch (error) {
    next(error);
  }
};

export const getWithdrawals = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { withdrawals, total } = await getWithdrawalHistory(req.user!.userId, page, limit);
    sendPaginated(res, 'Withdrawal history fetched successfully', withdrawals, total, page, limit);
  } catch (error) {
    next(error);
  }
};
