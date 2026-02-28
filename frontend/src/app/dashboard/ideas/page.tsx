'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useIdeas } from '../../../hooks/useIdeas';
import { IdeaCard } from '../../../components/ideas/IdeaCard';
import { Button } from '../../../components/ui/Button';
import { Spinner } from '../../../components/ui/Spinner';
import { Plus, Lightbulb } from 'lucide-react';

export default function IdeasPage() {
  const { ideas, isLoading, pagination, fetchIdeas } = useIdeas();

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Ideas</h1>
          <p className="text-gray-400 text-sm mt-1">{pagination.total} ideas submitted</p>
        </div>
        <Link href="/dashboard/ideas/submit">
          <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Submit New Idea</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : ideas.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Lightbulb className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No ideas yet</h3>
          <p className="text-gray-400 mb-4">Submit your first idea and start earning!</p>
          <Link href="/dashboard/ideas/submit">
            <Button><Plus className="h-4 w-4 mr-1" /> Submit Your First Idea</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => fetchIdeas(i + 1)}
                  className={`px-3 py-1 rounded-lg text-sm ${pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
