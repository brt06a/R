import React from 'react';
import Link from 'next/link';
import { DashboardStats } from '../../types';
import { Button } from '../ui/Button';
import { Wallet, Coins, ArrowUpRight, Plus } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

interface WalletOverviewProps {
  stats: DashboardStats;
  onBuyCoins: () => void;
}

export const WalletOverview = ({ stats, onBuyCoins }: WalletOverviewProps) => {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Wallet Overview</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="h-4 w-4 text-green-400" />
            <span className="text-xs text-gray-400">Balance</span>
          </div>
          <p className="text-lg font-bold text-green-400">{formatCurrency(stats.walletBalance)}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-gray-400">Coins</span>
          </div>
          <p className="text-lg font-bold text-yellow-400">{stats.coinBalance}</p>
        </div>
      </div>

      {stats.coinBalance === 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mb-4 animate-pulse-slow">
          <p className="text-xs text-yellow-400 font-medium">⚠️ Low coin balance! Buy coins to submit ideas.</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="primary" size="sm" className="flex-1" onClick={onBuyCoins}>
          <Plus className="h-3.5 w-3.5 mr-1" /> Buy Coins
        </Button>
        <Link href="/dashboard/withdraw" className="flex-1">
          <Button variant="secondary" size="sm" fullWidth>
            <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> Withdraw
          </Button>
        </Link>
      </div>
    </div>
  );
};
