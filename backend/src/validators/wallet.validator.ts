import { z } from 'zod';

export const createOrderSchema = z.object({
  planId: z.enum(['plan_30', 'plan_79', 'plan_159', 'plan_369'], {
    errorMap: () => ({ message: 'Invalid plan ID' }),
  }),
});

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1, 'Order ID is required'),
  razorpay_payment_id: z.string().min(1, 'Payment ID is required'),
  razorpay_signature: z.string().min(1, 'Signature is required'),
});
