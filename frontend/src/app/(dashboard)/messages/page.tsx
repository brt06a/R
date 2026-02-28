'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import api from '@/lib/api';
import { formatRelativeTime } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

interface Conversation {
  userId: string;
  user: { id: string; full_name: string };
  lastMessage: { content: string; created_at: string; is_read: boolean };
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConversations() {
      try {
        const { data } = await api.get('/messages/conversations');
        setConversations(data.data || []);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    }
    fetchConversations();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h2>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No messages yet</h3>
            <p className="mt-2 text-gray-500">Start a conversation about an idea</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {conversations.map((conv) => (
              <Card key={conv.userId} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">
                      {conv.user.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {conv.user.full_name}
                      </p>
                      <span className="text-xs text-gray-400">
                        {formatRelativeTime(conv.lastMessage.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conv.lastMessage.content}</p>
                  </div>
                  {!conv.lastMessage.is_read && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500 flex-shrink-0" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
