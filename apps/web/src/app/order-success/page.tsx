'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersApi.getById(orderId!).then((r) => r.data),
    enabled: !!orderId,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
          {/* Success Icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-14 h-14 text-green-600" strokeWidth={1.5} />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">
                ✓
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Placed! 🎉</h1>
          <p className="text-gray-500 mb-6">
            Thank you for your order. We're preparing your fresh groceries!
          </p>

          {order && (
            <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-left space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Order Number</span>
                <span className="font-bold text-gray-900">#{order.orderNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-bold text-green-700">{formatPrice(Number(order.finalAmount))}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Payment</span>
                <span className={`font-semibold ${order.paymentStatus === 'SUCCESS' ? 'text-green-600' : 'text-orange-500'}`}>
                  {order.paymentStatus === 'SUCCESS' ? '✓ Paid' : 'Cash on Delivery'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  {order.status}
                </span>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-400 mb-8">
            A confirmation email and SMS will be sent to you shortly.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href={`/account/orders/${orderId}`}
              className="btn-primary flex items-center justify-center gap-2 py-3"
            >
              <Package className="w-4 h-4" />
              Track Your Order
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
