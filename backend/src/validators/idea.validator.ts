import { z } from 'zod';

export const createIdeaSchema = z.object({
  categoryId: z.string().uuid('Invalid category ID'),
  title: z.string().min(5, 'Title must be at least 5 characters').max(255),
  description: z.string().min(20, 'Description must be at least 20 characters').max(5000),
  detailedDescription: z.string().max(20000).optional(),
  price: z.number().positive('Price must be positive').max(10000000).optional(),
});

export const updateIdeaSchema = z.object({
  title: z.string().min(5).max(255).optional(),
  description: z.string().min(20).max(5000).optional(),
  detailedDescription: z.string().max(20000).optional(),
  price: z.number().positive().max(10000000).optional(),
});

export const ideaQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(['pending', 'approved', 'rejected', 'sold', 'licensed']).optional(),
  categoryId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  sortBy: z.enum(['created_at', 'price', 'view_count']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type CreateIdeaInput = z.infer<typeof createIdeaSchema>;
export type UpdateIdeaInput = z.infer<typeof updateIdeaSchema>;
export type IdeaQueryInput = z.infer<typeof ideaQuerySchema>;
