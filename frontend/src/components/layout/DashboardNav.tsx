'use client';

import React from 'react';
import { Menu, Bell, Coins } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface DashboardNavProps {
  onMenuToggle: () => void;
}

export const DashboardNav = ({ onMenuToggle }: DashboardNavProps) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-gray-400"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex-1 lg:flex-none">
          <h1 className="text-sm text-gray-400 hidden lg:block">
            Welcome back, <span className="text-white font-medium">{user?.name}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">{user?.coinBalance ?? 0}</span>
            <span className="text-xs text-gray-500">coins</span>
          </div>

          <button className="relative p-2 rounded-lg hover:bg-white/10 text-gray-400">
            <Bell className="h-5 w-5" />
          </button>

          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};
