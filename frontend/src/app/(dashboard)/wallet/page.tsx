'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { useAuthStore } from '@/store/authStore';
import { WalletTransaction } from '@/types';
import api from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Coins, Wallet, ShoppingCart } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function WalletPage() {
  const { user, fetchProfile } = useAuthStore();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coinAmount, setCoinAmount] = useState(10);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const { data } = await api.get('/wallet/transactions');
      setTransactions(data.data || []);
    } catch {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePurchase() {
    if (coinAmount < 1 || coinAmount > 10000) {
      toast.error('Please enter between 1 and 10,000 coins');
      return;
    }

    setIsPurchasing(true);
    try {
      const { data } = await api.post('/payments/create-order', { coins: coinAmount });
      const order = data.data;

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'IdeaNax',
        description: `Purchase ${coinAmount} coins`,
        order_id: order.orderId,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          try {
            await api.post('/payments/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              idempotencyKey: uuidv4(),
            });
            toast.success(`${coinAmount} coins added to your account!`);
            fetchProfile();
            fetchTransactions();
          } catch {
            toast.error('Payment verification failed');
          }
        },
        theme: { color: '#3b82f6' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Failed to create order');
    } finally {
      setIsPurchasing(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Wallet</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white border-0">
            <div className="flex items-center gap-3">
              <Wallet className="w-10 h-10 opacity-80" />
              <div>
                <p className="text-sm opacity-80">Wallet Balance</p>
                <p className="text-3xl font-bold">{formatCurrency(user?.walletBalance || 0)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0">
            <div className="flex items-center gap-3">
              <Coins className="w-10 h-10 opacity-80" />
              <div>
                <p className="text-sm opacity-80">Coin Balance</p>
                <p className="text-3xl font-bold">{user?.coinBalance || 0} Coins</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Buy Coins
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="flex-1 w-full">
                <Input
                  label="Number of Coins"
                  type="number"
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(parseInt(e.target.value) || 0)}
                  min={1}
                  max={10000}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Price: {formatCurrency(coinAmount * 10)}
                </p>
              </div>
              <div className="flex gap-2">
                {[10, 50, 100, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCoinAmount(amount)}
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <Button onClick={handlePurchase} isLoading={isPurchasing} size="lg">
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <TransactionTable transactions={transactions} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
