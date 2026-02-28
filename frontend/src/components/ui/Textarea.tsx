'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5',
            'text-gray-900 placeholder-gray-400',
            'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
            'dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500',
            'transition-colors duration-200 resize-y min-h-[100px]',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
