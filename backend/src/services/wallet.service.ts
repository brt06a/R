import { PrismaClient } from '@prisma/client';
import { COIN_PLANS } from '../types';
import { createRazorpayOrder, verifyRazorpaySignature } from './razorpay.service';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export const initiateCoinsOrder = async (userId: string, planId: string) => {
  const plan = COIN_PLANS.find((p) => p.id === planId);
  if (!plan) throw new Error('Invalid plan');

  const { order } = await createRazorpayOrder(planId);

  // Create pending transaction
  await prisma.walletTransaction.create({
    data: {
      userId,
      type: 'CREDIT',
      reason: 'COIN_PURCHASE',
      amount: plan.price,
      coins: plan.coins,
      status: 'PENDING',
      razorpayOrderId: order.id as string,
      metadata: { planId, planName: plan.name },
    },
  });

  return { order, plan };
};

export const verifyAndCreditCoins = async (
  userId: string,
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) => {
  const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  if (!isValid) throw new Error('Invalid payment signature');

  // Find the pending transaction
  const transaction = await prisma.walletTransaction.findFirst({
    where: {
      userId,
      razorpayOrderId: razorpay_order_id,
      status: 'PENDING',
    },
  });

  if (!transaction) throw new Error('Transaction not found or already processed');

  // Update transaction and credit coins
  await prisma.$transaction([
    prisma.walletTransaction.update({
      where: { id: transaction.id },
      data: {
        status: 'COMPLETED',
        razorpayPaymentId: razorpay_payment_id,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { coinBalance: { increment: transaction.coins } },
    }),
  ]);

  logger.info(`Credited ${transaction.coins} coins to user ${userId}`);
  return { coins: transaction.coins };
};

export const getTransactions = async (userId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [transactions, total] = await Promise.all([
    prisma.walletTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.walletTransaction.count({ where: { userId } }),
  ]);

  return { transactions, total };
};

export const handleRazorpayWebhook = async (
  orderId: string,
  paymentId: string,
  _event: string
) => {
  // Idempotent: check if already processed
  const existing = await prisma.walletTransaction.findFirst({
    where: {
      razorpayOrderId: orderId,
      status: 'COMPLETED',
    },
  });

  if (existing) {
    logger.info(`Webhook already processed for order ${orderId}`);
    return { alreadyProcessed: true };
  }

  const transaction = await prisma.walletTransaction.findFirst({
    where: { razorpayOrderId: orderId, status: 'PENDING' },
  });

  if (!transaction) {
    logger.warn(`No pending transaction found for order ${orderId}`);
    return { alreadyProcessed: false };
  }

  await prisma.$transaction([
    prisma.walletTransaction.update({
      where: { id: transaction.id },
      data: { status: 'COMPLETED', razorpayPaymentId: paymentId },
    }),
    prisma.user.update({
      where: { id: transaction.userId },
      data: { coinBalance: { increment: transaction.coins } },
    }),
  ]);

  logger.info(`Webhook: Credited ${transaction.coins} coins to user ${transaction.userId}`);
  return { alreadyProcessed: false };
};
