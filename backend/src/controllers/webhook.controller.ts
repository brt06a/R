import { Request, Response, NextFunction } from 'express';
import { verifyWebhookSignature } from '../services/razorpay.service';
import { handleRazorpayWebhook } from '../services/wallet.service';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { logger } from '../utils/logger';

export const razorpayWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    if (!signature) {
      sendError(res, 'Missing webhook signature', 400);
      return;
    }

    const rawBody = JSON.stringify(req.body);
    const isValid = verifyWebhookSignature(rawBody, signature);

    if (!isValid) {
      logger.warn('Invalid Razorpay webhook signature');
      sendError(res, 'Invalid webhook signature', 400);
      return;
    }

    const event = req.body.event;
    const payload = req.body.payload;

    logger.info(`Razorpay webhook event: ${event}`);

    if (event === 'payment.captured') {
      const orderId = payload.payment.entity.order_id;
      const paymentId = payload.payment.entity.id;
      await handleRazorpayWebhook(orderId, paymentId, event);
    }

    sendSuccess(res, 'Webhook processed');
  } catch (error) {
    logger.error('Webhook processing error:', error);
    next(error);
  }
};
