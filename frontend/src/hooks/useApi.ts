'use client';

import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

export function useApi<T>(options: UseApiOptions = {}) {
  const { showSuccessToast = false, showErrorToast = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (apiCall: () => Promise<{ data: { data?: T; message?: string } }>) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiCall();
        const result = response.data;
        setData(result.data as T);

        if (showSuccessToast && result.message) {
          toast.success(result.message);
        }

        return result;
      } catch (err) {
        const axiosError = err as AxiosError<{ error?: { message?: string } }>;
        const message =
          axiosError.response?.data?.error?.message || 'Something went wrong';
        setError(message);

        if (showErrorToast) {
          toast.error(message);
        }

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [showSuccessToast, showErrorToast]
  );

  return { data, isLoading, error, execute, setData };
}
