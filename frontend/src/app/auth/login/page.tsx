'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuth } from '../../../hooks/useAuth';
import api from '../../../lib/api';
import toast from 'react-hot-toast';
import { Lightbulb } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ emailOrMobile: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isEmail = form.emailOrMobile.includes('@');
      const payload = isEmail
        ? { email: form.emailOrMobile, password: form.password }
        : { mobile: form.emailOrMobile, password: form.password };

      const res = await api.post('/auth/login', payload);
      const { accessToken, user } = res.data.data;
      login(accessToken, user);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
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
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-1">Sign in to your account</p>
        </div>

        <div className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email or Mobile"
              placeholder="you@example.com or 9876543210"
              value={form.emailOrMobile}
              onChange={(e) => setForm((p) => ({ ...p, emailOrMobile: e.target.value }))}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              required
            />
            <Button type="submit" isLoading={isLoading} fullWidth size="lg">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-primary-400 hover:text-primary-300 font-medium">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
