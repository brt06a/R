'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5',
              'text-gray-900 placeholder-gray-400',
              'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
              'dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500',
              'transition-colors duration-200',
              icon && 'pl-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
