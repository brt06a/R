import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Idea, PaginatedResponse } from '../types';
import toast from 'react-hot-toast';

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });

  const fetchIdeas = useCallback(async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await api.get<PaginatedResponse<Idea>>(
        `/ideas?page=${page}&limit=${limit}`
      );
      setIdeas(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to load ideas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitIdea = async (formData: FormData) => {
    const response = await api.post('/ideas', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  };

  return {
    ideas,
    isLoading,
    pagination,
    fetchIdeas,
    submitIdea,
  };
};
