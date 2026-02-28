'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '../../../hooks/useWallet';
import { BuyCoinsModal } from '../../../components/dashboard/BuyCoinsModal';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Spinner } from '../../../components/ui/Spinner';
import { formatCurrency, formatDate } from '../../../lib/utils';
import { WalletTransaction, TransactionType } from '../../../types';
import { Coins, Wallet, Plus } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

const typeVariant = (type: TransactionType) => type === 'CREDIT' ? 'success' : 'danger';

export default function WalletPage() {
  const { user } = useAuth();
  const { transactions, isLoading, pagination, fetchTransactions } = useWallet();
  const [showBuyCoins, setShowBuyCoins] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Wallet</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your coins and transaction history</p>
        </div>
        <Button size="sm" onClick={() => setShowBuyCoins(true)}>
          <Plus className="h-4 w-4 mr-1" /> Buy Coins
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-yellow-600/20"><Coins className="h-5 w-5 text-yellow-400" /></div>
            <p className="text-sm text-gray-400">Coin Balance</p>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{user?.coinBalance ?? 0}</p>
          <p className="text-xs text-gray-500 mt-1">1 submission = 5 coins</p>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-green-600/20"><Wallet className="h-5 w-5 text-green-400" /></div>
            <p className="text-sm text-gray-400">Wallet Balance</p>
          </div>
          <p className="text-3xl font-bold text-green-400">{formatCurrency(user?.walletBalance ?? 0)}</p>
          <p className="text-xs text-gray-500 mt-1">Earned from idea sales</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white">Transaction History</h3>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : transactions.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">No transactions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  {['Type', 'Reason', 'Amount', 'Coins', 'Status', 'Date'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx: WalletTransaction) => (
                  <tr key={tx.id} className="hover:bg-white/5">
                    <td className="px-4 py-3">
                      <Badge variant={typeVariant(tx.type)}>{tx.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{tx.reason.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3 text-white">{tx.amount > 0 ? formatCurrency(tx.amount) : '-'}</td>
                    <td className="px-4 py-3 text-yellow-400">{tx.coins > 0 ? `${tx.coins} 🪙` : '-'}</td>
                    <td className="px-4 py-3">
                      <Badge variant={tx.status === 'COMPLETED' ? 'success' : tx.status === 'FAILED' ? 'danger' : 'warning'}>
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{formatDate(tx.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <BuyCoinsModal isOpen={showBuyCoins} onClose={() => setShowBuyCoins(false)} />
    </div>
  );
}
