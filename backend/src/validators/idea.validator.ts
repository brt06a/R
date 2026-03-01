import { z } from 'zod';
import { SaleType } from '@prisma/client';

export const submitIdeaSchema = z.object({
  categoryId: z.string().uuid('Invalid category ID'),
  problemDesc: z.string().min(100, 'Problem description must be at least 100 characters').max(5000),
  solutionDesc: z.string().min(100, 'Solution description must be at least 100 characters').max(5000),
  saleType: z.nativeEnum(SaleType, { errorMap: () => ({ message: 'Invalid sale type' }) }),
  fixedPrice: z.number().positive('Fixed price must be positive').optional(),
  prototypeLink: z.string().url('Invalid prototype link').optional(),
}).refine((data) => {
  if (data.saleType === SaleType.FIXED_PRICE && !data.fixedPrice) {
    return false;
  }
  return true;
}, {
  message: 'Fixed price is required for FIXED_PRICE sale type',
  path: ['fixedPrice'],
});
