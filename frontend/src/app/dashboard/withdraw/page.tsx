'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { Spinner } from '../../../components/ui/Spinner';
import { useAuth } from '../../../hooks/useAuth';
import api from '../../../lib/api';
import { Withdrawal } from '../../../types';
import { formatCurrency, formatDate } from '../../../lib/utils';
import toast from 'react-hot-toast';

export default function WithdrawPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    amount: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/withdrawals')
      .then((res) => setWithdrawals(res.data.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (amount < 500) { toast.error('Minimum withdrawal is ₹500'); return; }
    if (amount > (user?.walletBalance || 0)) { toast.error('Insufficient wallet balance'); return; }

    setIsSubmitting(true);
    try {
      await api.post('/withdrawals/request', {
        amount,
        bankDetails: {
          accountNumber: form.accountNumber,
          ifscCode: form.ifscCode.toUpperCase(),
          accountHolderName: form.accountHolderName,
        },
      });
      toast.success('Withdrawal request submitted!');
      setForm({ amount: '', accountNumber: '', ifscCode: '', accountHolderName: '' });
      const res = await api.get('/withdrawals');
      setWithdrawals(res.data.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || 'Request failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fee = parseFloat(form.amount) ? (parseFloat(form.amount) * 0.05).toFixed(2) : '0.00';
  const net = parseFloat(form.amount) ? (parseFloat(form.amount) * 0.95).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Withdraw Funds</h1>
        <p className="text-gray-400 text-sm mt-1">Available: {formatCurrency(user?.walletBalance ?? 0)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4">Request Withdrawal</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Amount (₹)"
              type="number"
              min="500"
              max={user?.walletBalance}
              placeholder="Minimum ₹500"
              value={form.amount}
              onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
              required
            />
            {parseFloat(form.amount) > 0 && (
              <div className="bg-white/5 rounded-xl p-3 text-sm space-y-1">
                <div className="flex justify-between text-gray-400"><span>Amount</span><span>₹{parseFloat(form.amount).toFixed(2)}</span></div>
                <div className="flex justify-between text-red-400"><span>Platform fee (5%)</span><span>-₹{fee}</span></div>
                <div className="flex justify-between text-green-400 font-semibold border-t border-white/10 pt-1 mt-1"><span>You receive</span><span>₹{net}</span></div>
              </div>
            )}
            <Input label="Account Number" placeholder="Your bank account number" value={form.accountNumber} onChange={(e) => setForm((p) => ({ ...p, accountNumber: e.target.value }))} required />
            <Input label="IFSC Code" placeholder="e.g., SBIN0001234" value={form.ifscCode} onChange={(e) => setForm((p) => ({ ...p, ifscCode: e.target.value.toUpperCase() }))} required />
            <Input label="Account Holder Name" placeholder="As per bank records" value={form.accountHolderName} onChange={(e) => setForm((p) => ({ ...p, accountHolderName: e.target.value }))} required />
            <Button type="submit" isLoading={isSubmitting} fullWidth>
              Request Withdrawal
            </Button>
          </form>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">Withdrawal History</h3>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-8"><Spinner /></div>
          ) : withdrawals.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-sm">No withdrawals yet.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {withdrawals.map((w) => (
                <div key={w.id} className="px-5 py-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-white">{formatCurrency(w.amount)}</span>
                    <Badge variant={w.status === 'COMPLETED' ? 'success' : w.status === 'FAILED' ? 'danger' : w.status === 'PENDING' ? 'warning' : 'info'}>
                      {w.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Net: {formatCurrency(w.netAmount)}</span>
                    <span>{formatDate(w.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
