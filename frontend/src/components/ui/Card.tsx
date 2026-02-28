import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  glass?: boolean;
}

export function Card({ className, children, glass = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 dark:border-gray-700',
        glass
          ? 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg'
          : 'bg-white dark:bg-gray-800',
        'shadow-sm hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
}
