'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { ordersApi } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { ArrowLeft, Package, MapPin, CreditCard, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const STATUS_STEPS = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const router = useRouter();

  const { data: order, isLoading, refetch } = useQuery({
    queryKey: ['order', params.id],
    queryFn: () => ordersApi.getById(params.id).then((r) => r.data),
  });

  const cancelOrder = async () => {
    try {
      await ordersApi.cancel(params.id);
      toast({ title: 'Order cancelled' });
      refetch();
    } catch (err: any) {
      toast({ title: 'Cannot cancel', description: err.response?.data?.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="skeleton rounded-2xl h-96" />;
  if (!order) return <div className="text-center py-20 text-gray-500">Order not found</div>;

  const currentStepIndex = order.status === 'CANCELLED' ? -1 : STATUS_STEPS.indexOf(order.status);
  const addr = order.deliveryAddress;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
        {['PENDING', 'CONFIRMED'].includes(order.status) && (
          <button onClick={cancelOrder} className="ml-auto flex items-center gap-2 px-4 py-2 border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 text-sm transition-colors">
            <XCircle className="w-4 h-4" />
            Cancel Order
          </button>
        )}
      </div>

      {/* Status tracker */}
      {order.status !== 'CANCELLED' ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">Order Status</h2>
          <div className="flex items-center">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i <= currentStepIndex ? 'gradient-green text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {i < currentStepIndex ? '✓' : i + 1}
                  </div>
                  <div className={`text-xs mt-2 font-medium ${i <= currentStepIndex ? 'text-green-700' : 'text-gray-400'}`}>
                    {step.charAt(0) + step.slice(1).toLowerCase()}
                  </div>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 rounded-full ${i < currentStepIndex ? 'bg-green-500' : 'bg-gray-100'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-3 text-red-700">
          <XCircle className="w-5 h-5" />
          <span className="font-semibold">This order has been cancelled</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-green-600" />
            Items Ordered ({order.items?.length})
          </h2>
          <div className="space-y-3">
            {(order.items || []).map((item: any) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl">
                  {item.productImage ? (
                    <img src={item.productImage} alt="" className="w-full h-full object-cover rounded-xl" />
                  ) : '🛒'}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                  <div className="text-xs text-gray-500">Qty: {item.quantity} × {formatPrice(Number(item.price))}</div>
                </div>
                <div className="font-bold text-sm">{formatPrice(Number(item.totalPrice))}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary + Address */}
        <div className="space-y-4">
          {/* Price breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-green-600" />
              Price Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(Number(order.totalAmount))}</span></div>
              {Number(order.discountAmount) > 0 && (
                <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(Number(order.discountAmount))}</span></div>
              )}
              <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span>{Number(order.deliveryCharge) === 0 ? 'FREE' : formatPrice(Number(order.deliveryCharge))}</span></div>
              <hr className="border-gray-100" />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-green-700">{formatPrice(Number(order.finalAmount))}</span>
              </div>
            </div>
          </div>

          {/* Delivery address */}
          {addr && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                Delivery Address
              </h2>
              <div className="text-sm text-gray-600 space-y-0.5">
                <div className="font-semibold text-gray-900">{addr.fullName}</div>
                <div>{addr.phone}</div>
                <div>{addr.addressLine1}{addr.addressLine2 && `, ${addr.addressLine2}`}</div>
                <div>{addr.city}, {addr.state} — {addr.postalCode}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
