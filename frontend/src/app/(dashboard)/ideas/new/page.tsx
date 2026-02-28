'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Category } from '@/types';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Upload, AlertCircle } from 'lucide-react';

const ideaSchema = z.object({
  categoryId: z.string().min(1, 'Please select a category'),
  title: z.string().min(5, 'Title must be at least 5 characters').max(255),
  description: z.string().min(20, 'Description must be at least 20 characters').max(5000),
  detailedDescription: z.string().max(20000).optional(),
  price: z.coerce.number().positive().optional(),
});

type IdeaForm = z.infer<typeof ideaSchema>;

export default function SubmitIdeaPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [prototypeFile, setPrototypeFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdeaForm>({
    resolver: zodResolver(ideaSchema),
  });

  useEffect(() => {
    api.get('/categories').then(({ data }) => {
      setCategories(data.data || []);
    });
  }, []);

  const onSubmit = async (data: IdeaForm) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('categoryId', data.categoryId);
      formData.append('title', data.title);
      formData.append('description', data.description);
      if (data.detailedDescription) formData.append('detailedDescription', data.detailedDescription);
      if (data.price) formData.append('price', data.price.toString());
      if (documentFile) formData.append('document', documentFile);
      if (prototypeFile) formData.append('prototype', prototypeFile);

      await api.post('/ideas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Idea submitted successfully! 2 coins deducted.');
      router.push('/ideas');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: { message?: string } } } };
      toast.error(axiosErr?.response?.data?.error?.message || 'Failed to submit idea');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Submit New Idea</h2>
          <p className="mt-1 text-gray-500">Share your innovative concept with the world</p>
        </div>

        <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Submission Cost: 2 Coins
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
              Each idea submission requires 2 coins from your balance.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Idea Details</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Select
                label="Category"
                options={[
                  { value: '', label: 'Select a category' },
                  ...categories.map((c) => ({ value: c.id, label: c.name })),
                ]}
                error={errors.categoryId?.message}
                {...register('categoryId')}
              />

              <Input
                label="Title"
                placeholder="A short, descriptive title for your idea"
                error={errors.title?.message}
                {...register('title')}
              />

              <Textarea
                label="Description"
                placeholder="Describe your idea in detail (minimum 20 characters)"
                rows={4}
                error={errors.description?.message}
                {...register('description')}
              />

              <Textarea
                label="Detailed Description (optional)"
                placeholder="Provide additional details, market analysis, or implementation notes"
                rows={6}
                error={errors.detailedDescription?.message}
                {...register('detailedDescription')}
              />

              <Input
                label="Price (₹) (optional)"
                type="number"
                placeholder="Set a price for your idea"
                error={errors.price?.message}
                {...register('price')}
              />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Document (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Upload className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {documentFile ? documentFile.name : 'Upload PDF/DOC'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">PDF, DOC, DOCX. Max 10MB.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prototype (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Upload className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {prototypeFile ? prototypeFile.name : 'Upload file'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg,.webp,.zip"
                        onChange={(e) => setPrototypeFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">PDF, PNG, JPG, WEBP, ZIP. Max 50MB.</p>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                  Submit Idea (2 Coins)
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
