'use client';

import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { userApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';
import { useState, useEffect } from 'react';
import { Save, User } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: user?.name || '', phone: user?.phone || '' },
  });

  useEffect(() => {
    if (user) reset({ name: user.name, phone: user.phone });
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      const res = await userApi.updateProfile(data);
      updateUser(res.data);
      toast({ title: 'Profile updated!', description: 'Your changes have been saved.' });
    } catch {
      toast({ title: 'Error', description: 'Could not update profile', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 gradient-green rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">{user?.name}</div>
            <div className="text-gray-500 text-sm">{user?.email}</div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              {user?.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input
              {...register('name')}
              id="profile-name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-sm text-gray-400"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
            <input
              {...register('phone')}
              id="profile-phone"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          <button
            type="submit"
            id="profile-save-btn"
            disabled={saving}
            className="btn-primary flex items-center gap-2 px-8 py-2.5"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
