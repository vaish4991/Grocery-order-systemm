'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import { useAdminStore } from '@/lib/store';
import { Leaf, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAdminStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.login({ email, password });
      if (res.data.user.role !== 'ADMIN') {
        setError('Access denied. Admin account required.');
        return;
      }
      login(res.data.user, res.data.tokens.accessToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-gray-900">GOS Grocery</div>
                <div className="text-xs text-gray-500 font-medium">Admin Dashboard</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2.5 mb-4">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-700 font-medium">Restricted Access</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">Sign in to continue</h1>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                id="admin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gosgrocery.com"
                required
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="admin-login-btn"
              disabled={loading}
              className="w-full btn-primary py-3 text-base flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Sign in to Admin
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          GOS Grocery Admin © {new Date().getFullYear()} · Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
