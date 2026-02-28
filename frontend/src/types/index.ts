export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  isEmailVerified: boolean;
  role: string;
  walletBalance: number;
  coinBalance: number;
  createdAt: string;
}

export interface Idea {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  description: string;
  detailed_description?: string;
  document_url?: string;
  prototype_url?: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold' | 'licensed';
  price?: number;
  coins_spent: number;
  rejection_reason?: string;
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  categories?: { name: string; slug: string };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
}

export interface WalletTransaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  coins: number;
  balance_after?: number;
  coin_balance_after?: number;
  reference_id?: string;
  description?: string;
  status: string;
  created_at: string;
}

export interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  platform_fee: number;
  net_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  payout_mode: string;
  bank_account_name?: string;
  bank_account_number?: string;
  bank_ifsc?: string;
  bank_name?: string;
  upi_id?: string;
  failure_reason?: string;
  created_at: string;
  processed_at?: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  idea_id?: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender?: { full_name: string };
  receiver?: { full_name: string };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: Pagination;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}
