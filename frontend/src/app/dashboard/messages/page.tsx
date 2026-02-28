'use client';

import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import { Message } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { Spinner } from '../../../components/ui/Spinner';
import { formatDate } from '../../../lib/utils';
import { MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/messages')
      .then((res) => setMessages(res.data.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const markRead = async (id: string) => {
    await api.patch(`/messages/${id}/read`);
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, isRead: true } : m));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-gray-400 text-sm mt-1">Notifications and updates from IdeaNax</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : messages.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No messages yet</h3>
          <p className="text-gray-400 text-sm">Notifications about your ideas will appear here.</p>
        </div>
      ) : (
        <div className="glass-card divide-y divide-white/5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 cursor-pointer hover:bg-white/5 transition-colors ${!msg.isRead ? 'bg-primary-600/5' : ''}`}
              onClick={() => !msg.isRead && markRead(msg.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white">{msg.subject}</h4>
                    {!msg.isRead && <Badge variant="info">New</Badge>}
                  </div>
                  <p className="text-sm text-gray-400">{msg.body}</p>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">{formatDate(msg.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
