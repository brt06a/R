import crypto from 'crypto';
import { razorpay } from '../config/razorpay';
import { COIN_PLANS } from '../types';
import { env } from '../config/env';

export const createRazorpayOrder = async (planId: string) => {
  const plan = COIN_PLANS.find((p) => p.id === planId);
  if (!plan) throw new Error('Invalid plan');

  const order = await razorpay.orders.create({
    amount: plan.price * 100, // in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    notes: {
      planId: plan.id,
      coins: plan.coins.toString(),
    },
  });

  return { order, plan };
};

export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');
  return expectedSignature === signature;
};

export const verifyWebhookSignature = (body: string, signature: string): boolean => {
  const expectedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
  return expectedSignature === signature;
};
