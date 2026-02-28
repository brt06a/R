'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Lightbulb,
  PlusCircle,
  Wallet,
  ArrowDownToLine,
  MessageSquare,
  LogOut,
  Coins,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/ideas', label: 'My Ideas', icon: Lightbulb },
  { href: '/ideas/new', label: 'Submit Idea', icon: PlusCircle },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/withdraw', label: 'Withdraw', icon: ArrowDownToLine },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            IdeaNax
          </span>
        </div>

        {user && (
          <div className="px-4 py-3 mx-3 mt-3 rounded-lg bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.fullName}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {user.coinBalance} coins
              </span>
            </div>
          </div>
        )}

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
