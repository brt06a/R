import React from 'react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  colorClass?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  colorClass = 'text-primary-400',
  className,
}: StatCardProps) => {
  return (
    <div className={cn('glass-card p-5 hover:border-white/20 transition-all duration-200', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className={cn('text-2xl font-bold mt-1', colorClass)}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          {trend && (
            <p className={cn('text-xs mt-1', trend.value >= 0 ? 'text-green-400' : 'text-red-400')}>
              {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl bg-white/5', colorClass)}>
          {icon}
        </div>
      </div>
    </div>
  );
};
