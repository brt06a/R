'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { Idea } from '@/types';
import api from '@/lib/api';
import { formatDate, formatCurrency, truncate } from '@/lib/utils';
import { PlusCircle, Eye } from 'lucide-react';

export default function MyIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const { data } = await api.get('/ideas/my');
        setIdeas(data.data || []);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    }
    fetchIdeas();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Ideas</h2>
            <p className="mt-1 text-gray-500">Manage your submitted ideas</p>
          </div>
          <Link href="/ideas/new">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Submit Idea
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : ideas.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <PlusCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No ideas yet</h3>
            <p className="mt-2 text-gray-500">Submit your first idea to get started</p>
            <Link href="/ideas/new">
              <Button className="mt-4">Submit Your First Idea</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ideas.map((idea) => (
              <Card key={idea.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Badge status={idea.status} />
                    {idea.price && (
                      <span className="text-sm font-semibold text-green-600">
                        {formatCurrency(idea.price)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {truncate(idea.description, 120)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{formatDate(idea.created_at)}</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {idea.view_count}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
