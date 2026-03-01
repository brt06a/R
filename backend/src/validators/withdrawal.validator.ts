import { z } from 'zod';
import { MIN_WITHDRAWAL_AMOUNT } from '../utils/constants';

export const withdrawalRequestSchema = z.object({
  amount: z.number()
    .min(MIN_WITHDRAWAL_AMOUNT, `Minimum withdrawal amount is ₹${MIN_WITHDRAWAL_AMOUNT}`)
    .positive('Amount must be positive'),
  bankDetails: z.object({
    accountNumber: z.string().min(9, 'Invalid account number').max(18, 'Invalid account number'),
    ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
    accountHolderName: z.string().min(3, 'Account holder name is required').max(100),
  }),
});
