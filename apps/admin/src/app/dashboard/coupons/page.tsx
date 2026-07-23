'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { couponsApi } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { Plus, Ticket, Trash2 } from 'lucide-react';

export default function AdminCouponsPage() {
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState('');
  const [minOrderAmount, setMinOrderAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: coupons, isLoading, refetch } = useQuery({
    queryKey: ['coupons'],
    queryFn: () => couponsApi.getAll().then((r: any) => r.data),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await couponsApi.create({
        code: code.toUpperCase(),
        discountType,
        discountValue: Number(discountValue),
        minOrderAmount: minOrderAmount ? Number(minOrderAmount) : undefined,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      });
      setShowModal(false);
      refetch();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error creating coupon');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await couponsApi.delete(id);
      refetch();
    } catch (e) {
      alert('Failed to delete coupon');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons & Offers</h1>
          <p className="text-gray-500 text-sm">Create and manage discount promo codes</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <div className="col-span-full text-center py-10 text-gray-400">Loading coupons...</div>
        ) : (
          (coupons || []).map((c: any) => (
            <div key={c.id} className="card p-5 hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-base tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-xl border border-green-200">
                  {c.code}
                </span>
                <button onClick={() => handleDelete(c.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mb-1">
                {c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
              </div>
              <div className="text-xs text-gray-500">
                Min Order: {c.minOrderAmount ? formatPrice(Number(c.minOrderAmount)) : 'None'}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span>Uses: {c.usageCount}</span>
                <span>Active</span>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">Create Coupon Code</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Coupon Code</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required placeholder="e.g. FRESH50" className="input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Discount Type</label>
                  <select value={discountType} onChange={(e) => setDiscountType(e.target.value)} className="input">
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Discount Value</label>
                  <input type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} required className="input" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Min Order Amount (₹)</label>
                <input type="number" value={minOrderAmount} onChange={(e) => setMinOrderAmount(e.target.value)} className="input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="input" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border text-sm font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" className="btn-primary">Create Coupon</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
