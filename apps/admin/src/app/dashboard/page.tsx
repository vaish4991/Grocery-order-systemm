'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { ShoppingCart, DollarSign, Package, Users, TrendingUp, ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => dashboardApi.getStats().then((r) => r.data),
  });

  const totalOrders = statsData?.totalOrders || 0;
  const totalRevenue = statsData?.totalRevenue || 0;
  const recentOrders = statsData?.recentOrders || [];

  const kpis = [
    { title: 'Total Revenue', value: formatPrice(totalRevenue), change: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Orders', value: totalOrders.toString(), change: '+8.2%', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active Products', value: '128', change: '+4 new', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Total Customers', value: '450+', change: '+15.4%', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Welcome to GOS Grocery Admin Control Center</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map(({ title, value, change, icon: Icon, color, bg }) => (
          <div key={title} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{isLoading ? '...' : value}</div>
            <div className="text-xs font-medium text-gray-500">{title}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              <p className="text-xs text-gray-500">Real-time order activity</p>
            </div>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400">Loading orders...</td>
                  </tr>
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400">No orders found yet</td>
                  </tr>
                ) : (
                  recentOrders.map((order: any) => (
                    <tr key={order.id} className="table-row">
                      <td className="py-3.5 font-semibold text-gray-900">#{order.orderNumber}</td>
                      <td className="py-3.5 font-bold text-green-700">{formatPrice(Number(order.finalAmount))}</td>
                      <td className="py-3.5">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          order.paymentStatus === 'SUCCESS' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-xs text-gray-500">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & System Info */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Management</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/dashboard/products"
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-50 hover:border-green-200 text-center transition-all group"
              >
                <Package className="w-5 h-5 text-gray-600 group-hover:text-green-600 mx-auto mb-2" />
                <span className="text-xs font-semibold text-gray-700 group-hover:text-green-800">Add Product</span>
              </Link>
              <Link
                href="/dashboard/categories"
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-50 hover:border-green-200 text-center transition-all group"
              >
                <Package className="w-5 h-5 text-gray-600 group-hover:text-green-600 mx-auto mb-2" />
                <span className="text-xs font-semibold text-gray-700 group-hover:text-green-800">Categories</span>
              </Link>
              <Link
                href="/dashboard/coupons"
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-50 hover:border-green-200 text-center transition-all group"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-green-600 mx-auto mb-2" />
                <span className="text-xs font-semibold text-gray-700 group-hover:text-green-800">New Coupon</span>
              </Link>
              <Link
                href="/dashboard/orders"
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-50 hover:border-green-200 text-center transition-all group"
              >
                <Clock className="w-5 h-5 text-gray-600 group-hover:text-green-600 mx-auto mb-2" />
                <span className="text-xs font-semibold text-gray-700 group-hover:text-green-800">View Orders</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
