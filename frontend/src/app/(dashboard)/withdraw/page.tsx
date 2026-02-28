'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useAuthStore } from '@/store/authStore';
import { Withdrawal } from '@/types';
import api from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { ArrowDownToLine, AlertTriangle } from 'lucide-react';

const withdrawalSchema = z.object({
  amount: z.coerce.number().min(500, 'Minimum withdrawal is ₹500'),
  payoutMode: z.enum(['bank_transfer', 'upi']),
  bankAccountName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankIfsc: z.string().optional(),
  bankName: z.string().optional(),
  upiId: z.string().optional(),
});

type WithdrawalForm = z.infer<typeof withdrawalSchema>;

export default function WithdrawPage() {
  const { user, fetchProfile } = useAuthStore();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState<WithdrawalForm | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<WithdrawalForm>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: { payoutMode: 'bank_transfer' },
  });

  const payoutMode = watch('payoutMode');
  const amount = watch('amount');
  const platformFee = amount ? Math.round(amount * 2) / 100 : 0;
  const netAmount = amount ? amount - platformFee : 0;

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  async function fetchWithdrawals() {
    try {
      const { data } = await api.get('/withdrawals');
      setWithdrawals(data.data || []);
    } catch {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = (data: WithdrawalForm) => {
    setPendingData(data);
    setShowConfirmModal(true);
  };

  async function confirmWithdrawal() {
    if (!pendingData) return;
    setIsSubmitting(true);
    try {
      await api.post('/withdrawals', pendingData);
      toast.success('Withdrawal request submitted!');
      setShowConfirmModal(false);
      reset();
      fetchProfile();
      fetchWithdrawals();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: { message?: string } } } };
      toast.error(axiosErr?.response?.data?.error?.message || 'Withdrawal failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Withdraw Funds</h2>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ArrowDownToLine className="w-5 h-5" />
              Request Withdrawal
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Available: {formatCurrency(user?.walletBalance || 0)} | Min: ₹500 | Fee: 2%
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Amount (₹)"
                type="number"
                placeholder="Minimum ₹500"
                error={errors.amount?.message}
                {...register('amount')}
              />

              {amount >= 500 && (
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount:</span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Platform Fee (2%):</span>
                    <span className="font-medium text-red-500">-{formatCurrency(platformFee)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 dark:border-gray-700">
                    <span className="text-gray-500 font-medium">You&apos;ll receive:</span>
                    <span className="font-bold text-green-600">{formatCurrency(netAmount)}</span>
                  </div>
                </div>
              )}

              <Select
                label="Payout Mode"
                options={[
                  { value: 'bank_transfer', label: 'Bank Transfer' },
                  { value: 'upi', label: 'UPI' },
                ]}
                error={errors.payoutMode?.message}
                {...register('payoutMode')}
              />

              {payoutMode === 'bank_transfer' && (
                <div className="space-y-4">
                  <Input label="Account Holder Name" {...register('bankAccountName')} />
                  <Input label="Account Number" {...register('bankAccountNumber')} />
                  <Input label="IFSC Code" placeholder="SBIN0001234" {...register('bankIfsc')} />
                  <Input label="Bank Name" {...register('bankName')} />
                </div>
              )}

              {payoutMode === 'upi' && (
                <Input
                  label="UPI ID"
                  placeholder="yourname@paytm"
                  {...register('upiId')}
                />
              )}

              <Button type="submit" size="lg" className="w-full">
                Request Withdrawal
              </Button>
            </form>
          </CardContent>
        </Card>

        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Confirm Withdrawal"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Please confirm</p>
                <p className="text-yellow-600 dark:text-yellow-400">
                  You are about to withdraw {formatCurrency(pendingData?.amount || 0)}.
                  After 2% fee, you will receive {formatCurrency(netAmount)}.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={confirmWithdrawal}
                isLoading={isSubmitting}
              >
                Confirm Withdrawal
              </Button>
            </div>
          </div>
        </Modal>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Withdrawal History</h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {withdrawals.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No withdrawals yet
                      </td>
                    </tr>
                  ) : (
                    withdrawals.map((w) => (
                      <tr key={w.id}>
                        <td className="px-6 py-4 text-sm font-medium">{formatCurrency(w.amount)}</td>
                        <td className="px-6 py-4 text-sm text-red-500">{formatCurrency(w.platform_fee)}</td>
                        <td className="px-6 py-4 text-sm font-medium text-green-600">{formatCurrency(w.net_amount)}</td>
                        <td className="px-6 py-4 text-sm capitalize">{w.payout_mode.replace('_', ' ')}</td>
                        <td className="px-6 py-4"><Badge status={w.status} /></td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(w.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
