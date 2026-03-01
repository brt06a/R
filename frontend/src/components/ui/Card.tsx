import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'glass',
  children,
  ...props
}, ref) => {
  const variants = {
    default: 'bg-gray-900 rounded-2xl',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl',
    bordered: 'bg-gray-900 border border-white/20 rounded-2xl',
  };

  return (
    <div
      ref={ref}
      className={cn(variants[variant], 'p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
