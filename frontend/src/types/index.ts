export interface User {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  role: string;
  coinBalance: number;
  walletBalance: number;
  isVerified: boolean;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  estimatedEarningMin: number;
  estimatedEarningMax: number;
  icon?: string;
}

export interface Idea {
  id: string;
  userId: string;
  categoryId: string;
  category?: Category;
  problemDesc: string;
  solutionDesc: string;
  documentUrl?: string;
  prototypeUrl?: string;
  prototypeType?: string;
  saleType: SaleType;
  fixedPrice?: number;
  status: IdeaStatus;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type IdeaStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SOLD';
export type SaleType = 'FULL_SALE' | 'LICENSE' | 'FIXED_PRICE' | 'AUCTION';
export type TransactionType = 'CREDIT' | 'DEBIT';
export type TransactionReason = 'COIN_PURCHASE' | 'IDEA_SUBMISSION' | 'WITHDRAWAL' | 'REFUND' | 'SIGNUP_BONUS';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
export type WithdrawalStatus = 'PENDING' | 'APPROVED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REJECTED';

export interface WalletTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  reason: TransactionReason;
  amount: number;
  coins: number;
  status: TransactionStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  status: WithdrawalStatus;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  cashfreeTransferId?: string;
  processedAt?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  userId: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export interface CoinPlan {
  id: string;
  name: string;
  price: number;
  coins: number;
  description: string;
}

export interface DashboardStats {
  coinBalance: number;
  walletBalance: number;
  totalIdeas: number;
  pendingIdeas: number;
  approvedIdeas: number;
  rejectedIdeas: number;
  soldIdeas: number;
  unreadMessages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
