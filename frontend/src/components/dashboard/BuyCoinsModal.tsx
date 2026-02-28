'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useWallet } from '../../hooks/useWallet';
import { useAuth } from '../../hooks/useAuth';
import { CoinPlan } from '../../types';
import { Coins, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../../lib/utils';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
  prefill: { name: string; email: string };
  theme: { color: string };
}

interface BuyCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (coins: number) => void;
}

export const BuyCoinsModal = ({ isOpen, onClose, onSuccess }: BuyCoinsModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<CoinPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { plans, fetchPlans, createOrder, verifyPayment } = useWallet();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    if (isOpen) fetchPlans();
  }, [isOpen, fetchPlans]);

  const handlePurchase = async () => {
    if (!selectedPlan) return;
    setIsProcessing(true);

    try {
      const { order, plan } = await createOrder(selectedPlan.id);

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: order.amount,
        currency: 'INR',
        name: 'IdeaNax',
        description: `${plan.coins} Coins - ${plan.name} Plan`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await verifyPayment(response);
            const newCoins = (user?.coinBalance || 0) + plan.coins;
            updateUser({ coinBalance: newCoins });
            toast.success(`${plan.coins} coins added to your account!`);
            onSuccess?.(plan.coins);
            onClose();
          } catch {
            toast.error('Payment verification failed. Contact support.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: { color: '#6366f1' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch {
      toast.error('Failed to create order. Try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buy Coins" size="lg">
      <div className="space-y-4">
        <p className="text-sm text-gray-400">Select a plan to purchase coins. Coins are non-refundable.</p>

        <div className="grid grid-cols-2 gap-3">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all duration-200',
                selectedPlan?.id === plan.id
                  ? 'border-primary-500 bg-primary-600/20'
                  : 'border-white/10 bg-white/5 hover:border-white/30'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">{plan.name}</span>
                {selectedPlan?.id === plan.id && (
                  <CheckCircle className="h-4 w-4 text-primary-400" />
                )}
              </div>
              <div className="flex items-center gap-1 mb-1">
                <Coins className="h-4 w-4 text-yellow-400" />
                <span className="text-lg font-bold text-yellow-400">{plan.coins}</span>
                <span className="text-xs text-gray-400">coins</span>
              </div>
              <p className="text-xl font-bold text-white">₹{plan.price}</p>
              <p className="text-xs text-gray-400 mt-1">₹{(plan.price / plan.coins).toFixed(2)}/coin</p>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center">
          💡 Coins are non-refundable. By purchasing, you agree to our Terms & Conditions.
        </p>

        <Button
          fullWidth
          onClick={handlePurchase}
          isLoading={isProcessing}
          disabled={!selectedPlan}
        >
          {selectedPlan ? `Pay ₹${selectedPlan.price} for ${selectedPlan.coins} Coins` : 'Select a Plan'}
        </Button>
      </div>
    </Modal>
  );
};
