'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { Leaf, Phone } from 'lucide-react';

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';
  const { login } = useAuthStore();

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((v) => v - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) return;

    setLoading(true);
    setError('');
    try {
      const res = await authApi.verifyOtp({ phone, otp: code });
      login(res.data.user, res.data.tokens);
      router.push('/account');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    try {
      await authApi.verifyOtp({ phone, otp: 'resend' });
    } catch {}
    setResendTimer(30);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 gradient-green rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify your number</h1>
          <p className="text-gray-500 text-sm mb-2">
            We've sent a 6-digit OTP to
          </p>
          <p className="text-gray-900 font-semibold mb-8">+91 {phone}</p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-3 mb-8">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  id={`otp-${i}`}
                  className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              id="otp-verify-btn"
              disabled={loading || otp.join('').length !== 6}
              className="w-full btn-primary py-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500">
            Didn't receive the OTP?{' '}
            <button
              onClick={handleResend}
              disabled={resendTimer > 0}
              className="text-green-700 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
