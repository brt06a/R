import { z } from 'zod';

export const createWithdrawalSchema = z.object({
  amount: z.number().min(500, 'Minimum withdrawal amount is ₹500'),
  payoutMode: z.enum(['bank_transfer', 'upi']),
  bankAccountName: z.string().min(2).max(100).optional(),
  bankAccountNumber: z.string().min(5).max(50).optional(),
  bankIfsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code').optional(),
  bankName: z.string().max(100).optional(),
  upiId: z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/, 'Invalid UPI ID').optional(),
}).refine(
  (data) => {
    if (data.payoutMode === 'bank_transfer') {
      return data.bankAccountName && data.bankAccountNumber && data.bankIfsc;
    }
    if (data.payoutMode === 'upi') {
      return data.upiId;
    }
    return false;
  },
  {
    message: 'Bank details are required for bank transfer, UPI ID is required for UPI payout',
  }
);

export type CreateWithdrawalInput = z.infer<typeof createWithdrawalSchema>;
