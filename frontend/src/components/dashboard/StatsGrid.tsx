import React from 'react';
import { DashboardStats } from '../../types';
import { StatCard } from '../ui/StatCard';
import { Lightbulb, Clock, CheckCircle, XCircle, Wallet, Coins } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

interface StatsGridProps {
  stats: DashboardStats;
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      <StatCard title="Coin Balance" value={stats.coinBalance} subtitle="coins" icon={<Coins className="h-5 w-5" />} colorClass="text-yellow-400" />
      <StatCard title="Wallet Balance" value={formatCurrency(stats.walletBalance)} icon={<Wallet className="h-5 w-5" />} colorClass="text-green-400" />
      <StatCard title="Total Ideas" value={stats.totalIdeas} icon={<Lightbulb className="h-5 w-5" />} colorClass="text-primary-400" />
      <StatCard title="Pending" value={stats.pendingIdeas} icon={<Clock className="h-5 w-5" />} colorClass="text-yellow-400" />
      <StatCard title="Approved" value={stats.approvedIdeas} icon={<CheckCircle className="h-5 w-5" />} colorClass="text-green-400" />
      <StatCard title="Rejected" value={stats.rejectedIdeas} icon={<XCircle className="h-5 w-5" />} colorClass="text-red-400" />
    </div>
  );
};
