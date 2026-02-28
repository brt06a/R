import { Request } from 'express';
import { UserRole } from '@prisma/client';

export interface JwtPayload {
  userId: string;
  email?: string;
  mobile?: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email?: string;
    mobile?: string;
    role: UserRole;
  };
}

export interface CoinPlan {
  id: string;
  name: string;
  price: number;
  coins: number;
  description: string;
}

export const COIN_PLANS: CoinPlan[] = [
  { id: 'plan_30', name: 'Starter', price: 49, coins: 30, description: '30 coins for ₹49' },
  { id: 'plan_79', name: 'Basic', price: 99, coins: 79, description: '79 coins for ₹99' },
  { id: 'plan_159', name: 'Standard', price: 199, coins: 159, description: '159 coins for ₹199' },
  { id: 'plan_369', name: 'Premium', price: 499, coins: 369, description: '369 coins for ₹499' },
];

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
