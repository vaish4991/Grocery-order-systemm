'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { userApi, ordersApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { formatPrice, formatDate } from '@/lib/utils';
import { Package, MapPin, Star, User, ArrowRight } from 'lucide-react';

export default function AccountDashboard() {
  const { user } = useAuthStore();

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.getAll({ limit: 3 }).then((r) => r.data),
  });

  const stats = [
    { icon: Package, label: 'Total Orders', value: orders?.total || 0, href: '/account/orders', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: MapPin, label: 'Saved Addresses', value: '—', href: '/account/addresses', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: Star, label: 'My Reviews', value: '—', href: '/account/reviews', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-green-100 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, href, color, bg }) => (
          <Link key={href} href={href} className="bg-white rounded-2xl border border-gray-100 p-5 card-hover">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm text-green-700 hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {(!orders?.orders || orders.orders.length === 0) ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No orders yet</p>
            <Link href="/products" className="text-green-700 font-semibold text-sm hover:underline mt-2 block">
              Start shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.orders.map((order: any) => (
              <Link key={order.id} href={`/account/orders/${order.id}`}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div>
                  <div className="font-semibold text-sm text-gray-900">#{order.orderNumber}</div>
                  <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700 text-sm">{formatPrice(Number(order.finalAmount))}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>{order.status}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
