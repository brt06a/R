'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { EarningsChart } from '@/components/dashboard/EarningsChart';
import { useAuthStore } from '@/store/authStore';
import { WalletTransaction } from '@/types';
import api from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { Wallet, Coins, Lightbulb, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [ideaCount, setIdeaCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [txRes, ideasRes] = await Promise.all([
          api.get('/wallet/transactions?limit=10'),
          api.get('/ideas/my?limit=1'),
        ]);
        setTransactions(txRes.data.data || []);
        setIdeaCount(ideasRes.data.pagination?.total || 0);
      } catch {
        // Silently handle errors
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.fullName?.split(' ')[0]}! 👋
          </h2>
          <p className="mt-1 text-gray-500">Here&apos;s your account overview</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Wallet Balance"
            value={formatCurrency(user?.walletBalance || 0)}
            icon={<Wallet className="w-6 h-6 text-primary-600" />}
            gradient="bg-gradient-to-br from-primary-500 to-primary-600"
          />
          <StatCard
            title="Coin Balance"
            value={user?.coinBalance || 0}
            icon={<Coins className="w-6 h-6 text-yellow-600" />}
            gradient="bg-gradient-to-br from-yellow-500 to-yellow-600"
          />
          <StatCard
            title="Ideas Submitted"
            value={ideaCount}
            icon={<Lightbulb className="w-6 h-6 text-accent-600" />}
            gradient="bg-gradient-to-br from-accent-500 to-accent-600"
          />
          <StatCard
            title="Total Earnings"
            value={formatCurrency(user?.walletBalance || 0)}
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            gradient="bg-gradient-to-br from-green-500 to-green-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EarningsChart />
          <TransactionTable transactions={transactions} isLoading={isLoading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
