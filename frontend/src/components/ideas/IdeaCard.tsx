import React from 'react';
import { Idea } from '../../types';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/utils';
import { Calendar, Tag } from 'lucide-react';

interface IdeaCardProps {
  idea: Idea;
}

const statusVariant = (status: string): 'warning' | 'success' | 'danger' | 'purple' => {
  const map: Record<string, 'warning' | 'success' | 'danger' | 'purple'> = {
    PENDING: 'warning',
    APPROVED: 'success',
    REJECTED: 'danger',
    SOLD: 'purple',
  };
  return map[status] || 'warning';
};

export const IdeaCard = ({ idea }: IdeaCardProps) => {
  return (
    <div className="glass-card p-5 hover:border-white/20 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary-400 flex-shrink-0" />
          <span className="text-sm font-medium text-white">{idea.category?.name || 'Unknown Category'}</span>
        </div>
        <Badge variant={statusVariant(idea.status)}>{idea.status}</Badge>
      </div>

      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
        {idea.problemDesc.substring(0, 150)}...
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(idea.createdAt)}</span>
        </div>
        <span className="bg-white/5 px-2 py-0.5 rounded-md">{idea.saleType.replace(/_/g, ' ')}</span>
      </div>

      {idea.rejectionReason && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-xs text-red-400">Rejection reason: {idea.rejectionReason}</p>
        </div>
      )}
    </div>
  );
};
