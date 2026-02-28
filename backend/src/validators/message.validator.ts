import { z } from 'zod';

export const sendMessageSchema = z.object({
  receiverId: z.string().uuid('Invalid receiver ID'),
  ideaId: z.string().uuid('Invalid idea ID').optional(),
  content: z.string().min(1, 'Message cannot be empty').max(5000),
});

export const messageQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  conversationWith: z.string().uuid().optional(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type MessageQueryInput = z.infer<typeof messageQuerySchema>;
