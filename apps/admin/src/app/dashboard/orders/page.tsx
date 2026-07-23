'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { ShoppingCart, Search, Eye, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const ORDER_STATUS_OPTIONS = [
  'ALL',
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-orders', page, statusFilter],
    queryFn: () =>
      ordersApi
        .getAll({ page, limit: 15, status: statusFilter === 'ALL' ? undefined : statusFilter })
        .then((r) => r.data),
  });

  const orders = data?.orders || [];
  const totalPages = Math.ceil((data?.total || 0) / 15);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await ordersApi.updateStatus(id, status);
      refetch();
      if (selectedOrder?.id === id) {
        setSelectedOrder((prev: any) => ({ ...prev, status }));
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-500 text-sm">View, track and update customer orders</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {ORDER_STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() => { setStatusFilter(status); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === status
                ? 'gradient-green text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Order Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">Loading orders...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">No orders found</td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="table-row">
                    <td className="p-4 font-bold text-gray-900">#{order.orderNumber}</td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-800">{order.deliveryAddress?.fullName || 'Customer'}</div>
                      <div className="text-xs text-gray-500">{order.deliveryAddress?.phone}</div>
                    </td>
                    <td className="p-4 font-bold text-green-700">{formatPrice(Number(order.finalAmount))}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        order.paymentStatus === 'SUCCESS' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-green-500"
                      >
                        {ORDER_STATUS_OPTIONS.filter((s) => s !== 'ALL').map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-xs text-gray-500">{formatDate(order.createdAt)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">Order #{selectedOrder.orderNumber}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="text-sm space-y-2">
              <div><strong className="text-gray-700">Customer:</strong> {selectedOrder.deliveryAddress?.fullName}</div>
              <div><strong className="text-gray-700">Phone:</strong> {selectedOrder.deliveryAddress?.phone}</div>
              <div><strong className="text-gray-700">Address:</strong> {selectedOrder.deliveryAddress?.addressLine1}, {selectedOrder.deliveryAddress?.city} - {selectedOrder.deliveryAddress?.postalCode}</div>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <h4 className="font-bold text-sm text-gray-900 mb-2">Order Items</h4>
              <div className="space-y-2 text-xs">
                {selectedOrder.items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between py-1 border-b border-gray-50">
                    <span>{item.productName} x {item.quantity}</span>
                    <span className="font-semibold">{formatPrice(Number(item.totalPrice))}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between font-bold text-sm border-t border-gray-100 pt-3">
              <span>Final Amount</span>
              <span className="text-green-700">{formatPrice(Number(selectedOrder.finalAmount))}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
