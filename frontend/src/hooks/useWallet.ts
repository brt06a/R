import { useState, useCallback } from 'react';
import api from '../lib/api';
import { WalletTransaction, CoinPlan, PaginatedResponse } from '../types';
import toast from 'react-hot-toast';

export const useWallet = () => {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [plans, setPlans] = useState<CoinPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });

  const fetchTransactions = useCallback(async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await api.get<PaginatedResponse<WalletTransaction>>(
        `/wallet/transactions?page=${page}&limit=${limit}`
      );
      setTransactions(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPlans = useCallback(async () => {
    try {
      const response = await api.get('/wallet/plans');
      setPlans(response.data.data);
    } catch (error) {
      toast.error('Failed to load plans');
    }
  }, []);

  const createOrder = async (planId: string) => {
    const response = await api.post('/wallet/create-order', { planId });
    return response.data.data;
  };

  const verifyPayment = async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    const response = await api.post('/wallet/verify-payment', data);
    return response.data;
  };

  return {
    transactions,
    plans,
    isLoading,
    pagination,
    fetchTransactions,
    fetchPlans,
    createOrder,
    verifyPayment,
  };
};
