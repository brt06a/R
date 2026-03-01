'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuth } from '../../../hooks/useAuth';
import api from '../../../lib/api';
import toast from 'react-hot-toast';
import { Lightbulb } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const contact = searchParams.get('contact') || '';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isEmail = contact.includes('@');
      const payload = {
        otp,
        ...(isEmail ? { email: contact } : { mobile: contact }),
      };
      const res = await api.post('/auth/verify-otp', payload);
      const { accessToken, user } = res.data.data;
      login(accessToken, user);
      toast.success('Account verified! Welcome to IdeaNax 🎉');
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const isEmail = contact.includes('@');
      await api.post('/auth/resend-otp', isEmail ? { email: contact } : { mobile: contact });
      toast.success('OTP resent!');
      setCountdown(60);
    } catch {
      toast.error('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-primary-600">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">IdeaNax</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Verify OTP</h1>
          <p className="text-gray-400 mt-1">
            Enter the 6-digit code sent to <span className="text-white">{contact}</span>
          </p>
        </div>

        <div className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="OTP Code"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
            />
            <Button type="submit" isLoading={isLoading} fullWidth size="lg" disabled={otp.length !== 6}>
              Verify & Continue
            </Button>
          </form>

          <div className="text-center mt-4">
            {countdown > 0 ? (
              <p className="text-sm text-gray-400">Resend OTP in {countdown}s</p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-sm text-primary-400 hover:text-primary-300 font-medium"
              >
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
