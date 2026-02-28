'use client';

import React from 'react';
import { WalletTransaction } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';

interface TransactionTableProps {
  transactions: WalletTransaction[];
  isLoading?: boolean;
}

export function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Coins</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No transactions yet
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{tx.description || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-medium ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {tx.coins !== 0 && (
                        <span className={`text-sm font-medium ${tx.coins > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.coins > 0 ? '+' : ''}{tx.coins}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(tx.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
