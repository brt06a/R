import React from 'react';
import Link from 'next/link';
import { Idea } from '../../types';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

interface RecentIdeasProps {
  ideas: Idea[];
}

const statusVariant = (status: string): 'warning' | 'success' | 'danger' | 'info' | 'purple' => {
  const map: Record<string, 'warning' | 'success' | 'danger' | 'info' | 'purple'> = {
    PENDING: 'warning',
    APPROVED: 'success',
    REJECTED: 'danger',
    SOLD: 'purple',
  };
  return map[status] || 'info';
};

export const RecentIdeas = ({ ideas }: RecentIdeasProps) => {
  if (ideas.length === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-gray-400 mb-3">No ideas submitted yet.</p>
        <Link href="/dashboard/ideas/submit" className="text-primary-400 hover:text-primary-300 text-sm">
          Submit your first idea →
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Recent Ideas</h3>
        <Link href="/dashboard/ideas" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              {['Category', 'Sale Type', 'Status', 'Submitted'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {ideas.slice(0, 5).map((idea) => (
              <tr key={idea.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-white">{idea.category?.name || 'N/A'}</td>
                <td className="px-4 py-3 text-gray-400">{idea.saleType.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(idea.status)}>{idea.status}</Badge>
                </td>
                <td className="px-4 py-3 text-gray-400">{formatDate(idea.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
