'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      setStatus('verifying');
      api
        .post('/auth/verify-email', { token })
        .then(() => {
          setStatus('success');
          setMessage('Your email has been verified successfully!');
          toast.success('Email verified!');
        })
        .catch((err) => {
          setStatus('error');
          setMessage(err.response?.data?.error?.message || 'Verification failed');
        });
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        {status === 'pending' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Check Your Email</h1>
            <p className="mt-3 text-gray-500">
              We&apos;ve sent a verification link to your email address. Click the link to verify your account.
            </p>
            <Link href="/login">
              <Button variant="outline" className="mt-6">
                Go to Login
              </Button>
            </Link>
          </>
        )}

        {status === 'verifying' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verifying...</h1>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Verified!</h1>
            <p className="mt-3 text-gray-500">{message}</p>
            <Button className="mt-6" onClick={() => router.push('/login')}>
              Go to Login
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verification Failed</h1>
            <p className="mt-3 text-gray-500">{message}</p>
            <Link href="/login">
              <Button variant="outline" className="mt-6">
                Go to Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
