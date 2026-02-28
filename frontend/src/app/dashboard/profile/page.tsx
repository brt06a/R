'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useAuth } from '../../../hooks/useAuth';
import api from '../../../lib/api';
import toast from 'react-hot-toast';
import { User, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', dateOfBirth: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPw, setIsChangingPw] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await api.patch('/users/profile', form);
      updateUser(res.data.data);
      toast.success('Profile updated!');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || 'Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match'); return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters'); return;
    }
    setIsChangingPw(true);
    try {
      await api.patch('/users/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Password changed!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || 'Password change failed');
    } finally {
      setIsChangingPw(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account information</p>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{user?.name}</h3>
            <p className="text-sm text-gray-400">{user?.email || user?.mobile}</p>
            <p className="text-xs text-primary-400 mt-0.5">{user?.role}</p>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-primary-400" />
            <h4 className="text-sm font-semibold text-white">Personal Information</h4>
          </div>
          <Input label="Full Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email / Mobile</label>
            <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed">
              {user?.email || user?.mobile}
            </div>
            <p className="mt-1 text-xs text-gray-500">Contact info cannot be changed</p>
          </div>
          <Button type="submit" isLoading={isUpdating}>Save Changes</Button>
        </form>
      </div>

      <div className="glass-card p-6">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-primary-400" />
            <h4 className="text-sm font-semibold text-white">Change Password</h4>
          </div>
          <Input label="Current Password" type="password" placeholder="Your current password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))} required />
          <Input label="New Password" type="password" placeholder="Minimum 8 characters" value={passwordForm.newPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))} required />
          <Input label="Confirm New Password" type="password" placeholder="Repeat new password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))} required />
          <Button type="submit" isLoading={isChangingPw} variant="secondary">Change Password</Button>
        </form>
      </div>
    </div>
  );
}
