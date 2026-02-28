'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useIdeas } from '../../hooks/useIdeas';
import { StatsGrid } from '../../components/dashboard/StatsGrid';
import { RecentIdeas } from '../../components/dashboard/RecentIdeas';
import { WalletOverview } from '../../components/dashboard/WalletOverview';
import { BuyCoinsModal } from '../../components/dashboard/BuyCoinsModal';
import { Spinner } from '../../components/ui/Spinner';
import api from '../../lib/api';
import { DashboardStats } from '../../types';
import { Coins } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuth();
  const { ideas, fetchIdeas } = useIdeas();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBuyCoins, setShowBuyCoins] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [statsRes] = await Promise.all([
          api.get('/users/dashboard'),
          fetchIdeas(1, 5),
        ]);
        setStats(statsRes.data.data);
      } catch {
        // handled
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [fetchIdeas]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back, {user?.name}!</p>
        </div>
        <Link href="/dashboard/ideas/submit">
          <Button size="sm">+ Submit Idea</Button>
        </Link>
      </div>

      {user?.coinBalance === 0 && (
        <div className="glass-card p-4 border-yellow-500/30 bg-yellow-500/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coins className="h-5 w-5 text-yellow-400 animate-pulse" />
            <div>
              <p className="text-sm font-semibold text-yellow-400">Low Coin Balance!</p>
              <p className="text-xs text-gray-400">You need coins to submit ideas. Buy more coins now.</p>
            </div>
          </div>
          <Button size="sm" onClick={() => setShowBuyCoins(true)}>Buy Coins</Button>
        </div>
      )}

      {stats && <StatsGrid stats={stats} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentIdeas ideas={ideas} />
        </div>
        <div>
          {stats && (
            <WalletOverview
              stats={stats}
              onBuyCoins={() => setShowBuyCoins(true)}
            />
          )}
        </div>
      </div>

      <BuyCoinsModal isOpen={showBuyCoins} onClose={() => setShowBuyCoins(false)} />
    </div>
  );
}
