'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { Package, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const ORDER_STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-purple-100 text-purple-700',
  SHIPPED: 'bg-indigo-100 text-indigo-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => ordersApi.getAll({ page, limit: 10 }).then((r) => r.data),
  });

  const orders = data?.orders || [];
  const totalPages = Math.ceil((data?.total || 0) / 10);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(5).fill(0).map((_, i) => <div key={i} className="skeleton rounded-2xl h-20" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-500 text-sm mt-1">
          {data?.total || 0} orders total
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <Package className="w-14 h-14 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 text-sm mb-6">Start shopping to see your orders here</p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-2">
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order: any) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block bg-white rounded-2xl border border-gray-100 p-5 card-hover"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">#{order.orderNumber}</div>
                    <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                    <div className="text-xs text-gray-500">{order.items?.length || 0} items</div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="font-bold text-green-700">{formatPrice(Number(order.finalAmount))}</div>
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium mt-1 ${ORDER_STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.status}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
