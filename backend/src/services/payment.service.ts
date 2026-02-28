import crypto from 'crypto';
import { razorpay } from '../config/razorpay';
import { env } from '../config/env';
import { WalletRepository } from '../repositories/wallet.repository';
import { UserRepository } from '../repositories/user.repository';
import { AuditRepository } from '../repositories/audit.repository';
import { BadRequestError, ConflictError } from '../utils/errors';
import { logger } from '../utils/logger';

const walletRepo = new WalletRepository();
const userRepo = new UserRepository();
const auditRepo = new AuditRepository();

const COIN_PRICE_INR = 10;

export class PaymentService {
  async createOrder(userId: string, coins: number) {
    const amount = coins * COIN_PRICE_INR * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `coins_${userId}_${Date.now()}`,
      notes: {
        userId,
        coins: coins.toString(),
      },
    });

    await auditRepo.create({
      user_id: userId,
      action: 'payment.order_created',
      entity_type: 'payment',
      entity_id: order.id,
      new_values: { coins, amount: amount / 100 },
    });

    logger.info('Razorpay order created', { userId, orderId: order.id, coins });

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.RAZORPAY_KEY_ID,
    };
  }

  async verifyPayment(
    userId: string,
    input: {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
      idempotencyKey: string;
    }
  ) {
    const existingTx = await walletRepo.findByIdempotencyKey(input.idempotencyKey);
    if (existingTx) {
      logger.warn('Duplicate payment verification attempt', { idempotencyKey: input.idempotencyKey });
      return { message: 'Payment already processed', transaction: existingTx };
    }

    const body = input.razorpayOrderId + '|' + input.razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== input.razorpaySignature) {
      logger.warn('Invalid Razorpay signature', { userId, orderId: input.razorpayOrderId });
      throw new BadRequestError('Invalid payment signature', 'INVALID_SIGNATURE');
    }

    const order = await razorpay.orders.fetch(input.razorpayOrderId);
    const coins = parseInt(order.notes?.coins as string || '0', 10);

    if (!coins || coins <= 0) {
      throw new BadRequestError('Invalid coin amount in order');
    }

    const newBalance = await walletRepo.updateUserWallet(userId, 0, coins);

    const transaction = await walletRepo.createTransaction({
      user_id: userId,
      type: 'coin_purchase',
      amount: Number(order.amount) / 100,
      coins,
      balance_after: Number(newBalance.wallet_balance),
      coin_balance_after: Number(newBalance.coin_balance),
      reference_id: input.razorpayPaymentId,
      payment_provider: 'razorpay',
      payment_order_id: input.razorpayOrderId,
      payment_signature: input.razorpaySignature,
      idempotency_key: input.idempotencyKey,
      description: `Purchased ${coins} coins`,
      status: 'completed',
    });

    await auditRepo.create({
      user_id: userId,
      action: 'payment.verified',
      entity_type: 'payment',
      entity_id: input.razorpayPaymentId,
      new_values: { coins, amount: Number(order.amount) / 100, orderId: input.razorpayOrderId },
    });

    logger.info('Payment verified', { userId, coins, paymentId: input.razorpayPaymentId });

    return { message: 'Payment verified successfully', transaction };
  }

  async handleWebhook(body: string, signature: string) {
    const expectedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new BadRequestError('Invalid webhook signature');
    }

    const event = JSON.parse(body);
    logger.info('Razorpay webhook received', { event: event.event });

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      logger.info('Payment captured webhook', { paymentId: payment.id });
    }

    return { received: true };
  }
}
