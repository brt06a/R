import { Response, NextFunction } from 'express';
import { AuthRequest, COIN_PLANS } from '../types';
import { initiateCoinsOrder, verifyAndCreditCoins, getTransactions } from '../services/wallet.service';
import { sendSuccess, sendPaginated } from '../utils/apiResponse';

export const getPlans = async (_req: AuthRequest, res: Response): Promise<void> => {
  sendSuccess(res, 'Plans fetched successfully', COIN_PLANS);
};

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { order, plan } = await initiateCoinsOrder(req.user!.userId, req.body.planId);
    sendSuccess(res, 'Order created successfully', { order, plan });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await verifyAndCreditCoins(
      req.user!.userId,
      req.body.razorpay_order_id,
      req.body.razorpay_payment_id,
      req.body.razorpay_signature
    );
    sendSuccess(res, `Payment verified! ${result.coins} coins added to your account.`, result);
  } catch (error) {
    next(error);
  }
};

export const getWalletTransactions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { transactions, total } = await getTransactions(req.user!.userId, page, limit);
    sendPaginated(res, 'Transactions fetched successfully', transactions, total, page, limit);
  } catch (error) {
    next(error);
  }
};
