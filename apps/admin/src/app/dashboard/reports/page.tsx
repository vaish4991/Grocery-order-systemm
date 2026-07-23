'use client';

import { BarChart3, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500 text-sm">Detailed insights into platform sales performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-sm">Monthly Revenue Target</h3>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">₹1,24,500</div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
            <div className="bg-emerald-500 h-2 rounded-full w-3/4" />
          </div>
          <p className="text-xs text-gray-500 mt-2">75% of ₹1,60,000 monthly goal achieved</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-sm">Average Order Value (AOV)</h3>
            <ShoppingBag className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">₹485</div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +5.4% from last month
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-sm">Top Category by Sales</h3>
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">Fruits & Vegetables</div>
          <p className="text-xs text-gray-500 mt-2">Accounts for 42% of total store revenue</p>
        </div>
      </div>
    </div>
  );
}
