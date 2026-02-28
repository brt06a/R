'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useIdeas } from '../../hooks/useIdeas';
import { Category } from '../../types';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { cn } from '../../lib/utils';
import { ChevronRight, ChevronLeft, Upload, CheckCircle } from 'lucide-react';

const STEPS = ['Category', 'Problem & Solution', 'Files', 'Sale Type', 'Confirm'];

const SALE_TYPES = [
  { value: 'FULL_SALE', label: 'Full Sale', desc: 'Transfer all rights to the buyer' },
  { value: 'LICENSE', label: 'License', desc: 'License rights while retaining ownership' },
  { value: 'FIXED_PRICE', label: 'Fixed Price', desc: 'Set a specific price for your idea' },
  { value: 'AUCTION', label: 'Auction', desc: 'Let buyers bid on your idea' },
];

export const IdeaForm = () => {
  const router = useRouter();
  const { submitIdea } = useIdeas();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    categoryId: '',
    problemDesc: '',
    solutionDesc: '',
    saleType: '',
    fixedPrice: '',
    prototypeLink: '',
  });
  const [files, setFiles] = useState<{ document?: File; prototype?: File }>({});

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data)).catch(() => {});
  }, []);

  const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const canProceed = () => {
    if (step === 0) return !!formData.categoryId;
    if (step === 1) return formData.problemDesc.length >= 100 && formData.solutionDesc.length >= 100;
    if (step === 2) return true;
    if (step === 3) return !!formData.saleType && (formData.saleType !== 'FIXED_PRICE' || !!formData.fixedPrice);
    if (step === 4) return agreed;
    return false;
  };

  const handleSubmit = async () => {
    if (!agreed) { toast.error('Please accept the Terms & Conditions'); return; }
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (v) fd.append(k, v); });
      if (files.document) fd.append('document', files.document);
      if (files.prototype) fd.append('prototype', files.prototype);
      await submitIdea(fd);
      toast.success('Idea submitted successfully!');
      router.push('/dashboard/ideas');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || 'Failed to submit idea');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find((c) => c.id === formData.categoryId);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className={cn('flex items-center gap-1.5 text-xs font-medium', i === step ? 'text-primary-400' : i < step ? 'text-green-400' : 'text-gray-500')}>
              <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs border',
                i === step ? 'border-primary-500 bg-primary-600/20 text-primary-400' :
                i < step ? 'border-green-500 bg-green-600/20 text-green-400' :
                'border-white/20 text-gray-500'
              )}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className="hidden sm:block">{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={cn('flex-1 h-px', i < step ? 'bg-green-500/50' : 'bg-white/10')} />}
          </React.Fragment>
        ))}
      </div>

      <div className="glass-card p-6">
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Select Category</h3>
            <select
              className="w-full input-glass"
              value={formData.categoryId}
              onChange={(e) => update('categoryId', e.target.value)}
            >
              <option value="">Choose a category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name} (₹{c.estimatedEarningMin.toLocaleString()} - ₹{c.estimatedEarningMax.toLocaleString()})</option>
              ))}
            </select>
            {selectedCategory && (
              <div className="p-3 bg-primary-600/10 border border-primary-500/20 rounded-xl">
                <p className="text-sm text-primary-400 font-medium">{selectedCategory.name}</p>
                <p className="text-xs text-gray-400 mt-1">Estimated earnings: ₹{selectedCategory.estimatedEarningMin.toLocaleString()} - ₹{selectedCategory.estimatedEarningMax.toLocaleString()}</p>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Describe Your Idea</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Problem Description <span className="text-gray-500">({formData.problemDesc.length}/5000, min 100)</span></label>
              <textarea
                className="w-full input-glass resize-none"
                rows={5}
                value={formData.problemDesc}
                onChange={(e) => update('problemDesc', e.target.value)}
                placeholder="Describe the problem your idea solves (minimum 100 characters)..."
                maxLength={5000}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Solution Description <span className="text-gray-500">({formData.solutionDesc.length}/5000, min 100)</span></label>
              <textarea
                className="w-full input-glass resize-none"
                rows={5}
                value={formData.solutionDesc}
                onChange={(e) => update('solutionDesc', e.target.value)}
                placeholder="Describe your solution in detail (minimum 100 characters)..."
                maxLength={5000}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Upload Supporting Files</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Document (PDF/PPT/DOCX, max 10MB)</label>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary-500/50 transition-colors">
                <Upload className="h-6 w-6 text-gray-400 mb-1" />
                <span className="text-sm text-gray-400">{files.document ? files.document.name : 'Click to upload'}</span>
                <input type="file" className="hidden" accept=".pdf,.ppt,.pptx,.doc,.docx" onChange={(e) => setFiles((p) => ({ ...p, document: e.target.files?.[0] }))} />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prototype (Image/Video, max 10MB) or Link</label>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary-500/50 transition-colors mb-2">
                <Upload className="h-6 w-6 text-gray-400 mb-1" />
                <span className="text-sm text-gray-400">{files.prototype ? files.prototype.name : 'Click to upload'}</span>
                <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.webp,.mp4" onChange={(e) => setFiles((p) => ({ ...p, prototype: e.target.files?.[0] }))} />
              </label>
              <Input placeholder="Or enter a prototype URL (optional)" value={formData.prototypeLink} onChange={(e) => update('prototypeLink', e.target.value)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Choose Sale Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {SALE_TYPES.map(({ value, label, desc }) => (
                <button
                  key={value}
                  onClick={() => update('saleType', value)}
                  className={cn('p-4 rounded-xl border text-left transition-all',
                    formData.saleType === value ? 'border-primary-500 bg-primary-600/20' : 'border-white/10 hover:border-white/30'
                  )}
                >
                  <p className="text-sm font-semibold text-white mb-1">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </button>
              ))}
            </div>
            {formData.saleType === 'FIXED_PRICE' && (
              <Input
                label="Fixed Price (₹)"
                type="number"
                min="1"
                placeholder="Enter your asking price"
                value={formData.fixedPrice}
                onChange={(e) => update('fixedPrice', e.target.value)}
              />
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Review & Confirm</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Category', value: selectedCategory?.name },
                { label: 'Sale Type', value: formData.saleType?.replace(/_/g, ' ') },
                formData.fixedPrice && { label: 'Fixed Price', value: `₹${formData.fixedPrice}` },
                { label: 'Document', value: files.document?.name || 'Not uploaded' },
                { label: 'Prototype', value: files.prototype?.name || formData.prototypeLink || 'Not provided' },
              ].filter(Boolean).map((item) => (
                item && (
                  <div key={item.label} className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                )
              ))}
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
              <p className="text-sm text-yellow-400 font-medium">💰 5 coins will be deducted from your balance.</p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-gray-500 text-primary-600 bg-white/5"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="text-sm text-gray-300">
                I accept the <a href="/terms" target="_blank" className="text-primary-400 hover:underline">Terms & Conditions</a> and <a href="/privacy-policy" target="_blank" className="text-primary-400 hover:underline">Privacy Policy</a> of IdeaNax, and understand that by submitting, I irrevocably transfer all intellectual property rights to IdeaNax.
              </span>
            </label>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
          <Button variant="ghost" onClick={() => setStep((p) => p - 1)} disabled={step === 0}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep((p) => p + 1)} disabled={!canProceed()}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} isLoading={isSubmitting} disabled={!agreed}>
              <CheckCircle className="h-4 w-4 mr-1" /> Submit Idea
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
