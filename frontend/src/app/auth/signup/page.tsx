'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import api from '../../../lib/api';
import toast from 'react-hot-toast';
import { Lightbulb } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    emailOrMobile: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setIsLoading(true);
    try {
      const isEmail = form.emailOrMobile.includes('@');
      const payload = {
        name: form.name,
        dateOfBirth: form.dateOfBirth,
        password: form.password,
        ...(isEmail ? { email: form.emailOrMobile } : { mobile: form.emailOrMobile }),
      };

      await api.post('/auth/signup', payload);
      toast.success('Account created! Check your email/mobile for OTP.');
      router.push(`/auth/verify-otp?contact=${encodeURIComponent(form.emailOrMobile)}`);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || 'Signup failed');
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
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-1">Get 15 free coins on signup!</p>
        </div>

        <div className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
            <Input label="Email or Mobile" placeholder="you@example.com or 9876543210" value={form.emailOrMobile} onChange={(e) => setForm((p) => ({ ...p, emailOrMobile: e.target.value }))} required />
            <Input label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(e) => setForm((p) => ({ ...p, dateOfBirth: e.target.value }))} required />
            <Input label="Password" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
            <Input label="Confirm Password" type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))} required />
            <Button type="submit" isLoading={isLoading} fullWidth size="lg">
              Create Free Account
            </Button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-3">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-primary-400 hover:underline">Terms</Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-primary-400 hover:underline">Privacy Policy</Link>
          </p>

          <p className="text-center text-sm text-gray-400 mt-3">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
