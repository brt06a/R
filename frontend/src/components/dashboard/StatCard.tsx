import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  gradient?: string;
}

export function StatCard({ title, value, icon, trend, gradient }: StatCardProps) {
  return (
    <Card className="p-6 relative overflow-hidden">
      {gradient && (
        <div className={cn('absolute inset-0 opacity-5', gradient)} />
      )}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                'mt-1 text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900">
          {icon}
        </div>
      </div>
    </Card>
  );
}
