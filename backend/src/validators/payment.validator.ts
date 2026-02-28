import { z } from 'zod';

export const createOrderSchema = z.object({
  coins: z.number().int().positive('Coins must be a positive integer').min(1).max(10000),
});

export const verifyPaymentSchema = z.object({
  razorpayOrderId: z.string().min(1, 'Order ID is required'),
  razorpayPaymentId: z.string().min(1, 'Payment ID is required'),
  razorpaySignature: z.string().min(1, 'Signature is required'),
  idempotencyKey: z.string().uuid('Invalid idempotency key'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
