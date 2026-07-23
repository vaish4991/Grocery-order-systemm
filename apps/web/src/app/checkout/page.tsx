'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cartApi, userApi, ordersApi, paymentsApi, couponsApi } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Tag, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function CheckoutPage() {
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState<any>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [placing, setPlacing] = useState(false);
  const router = useRouter();
  const { clear } = useCartStore();
  const { toast } = useToast();

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get().then((r) => r.data),
  });

  const { data: addresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => userApi.getAddresses().then((r) => r.data),
  });

  const items = cart?.items || [];
  const subtotal = cart?.totalAmount || 0;
  const discountAmount = couponData?.discountAmount || 0;
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const total = subtotal - discountAmount + deliveryCharge;

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const { data } = await couponsApi.apply(couponCode, subtotal);
      setCouponData(data);
      toast({ title: '🎉 Coupon applied!', description: `Saved ${formatPrice(data.discountAmount)}` });
    } catch (err: any) {
      toast({ title: 'Invalid coupon', description: err.response?.data?.message, variant: 'destructive' });
      setCouponData(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePlaceOrder = async (paymentMethod: 'RAZORPAY' | 'COD') => {
    if (!selectedAddressId) {
      toast({ title: 'Select an address', variant: 'destructive', description: 'Please select a delivery address' });
      return;
    }

    setPlacing(true);
    try {
      const { data: orderData } = await ordersApi.create({
        addressId: selectedAddressId,
        couponCode: couponData?.couponCode,
        paymentMethod,
      });

      if (paymentMethod === 'COD') {
        clear();
        router.push(`/order-success?orderId=${orderData.order.id}`);
        return;
      }

      // Razorpay flow
      const { data: payData } = await paymentsApi.initiate(orderData.order.id);

      const rzp = new (window as any).Razorpay({
        key: payData.keyId,
        amount: payData.amount,
        currency: payData.currency,
        name: 'GOS Grocery',
        description: `Order ${payData.orderNumber}`,
        order_id: payData.razorpayOrderId,
        handler: async (response: any) => {
          await paymentsApi.verify({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderId: orderData.order.id,
          });
          clear();
          router.push(`/order-success?orderId=${orderData.order.id}`);
        },
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#16a34a' },
      });
      rzp.open();
    } catch (err: any) {
      toast({ title: 'Order failed', description: err.response?.data?.message, variant: 'destructive' });
      router.push('/order-failed');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Address + Coupon */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Delivery Address
            </h2>
            <div className="space-y-3">
              {(addresses || []).map((addr: any) => (
                <label
                  key={addr.id}
                  className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedAddressId === addr.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    className="mt-1 accent-green-600"
                  />
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">{addr.fullName}</div>
                    <div className="text-gray-600">{addr.phone}</div>
                    <div className="text-gray-600">
                      {addr.addressLine1}
                      {addr.addressLine2 && `, ${addr.addressLine2}`}
                    </div>
                    <div className="text-gray-600">
                      {addr.city}, {addr.state} — {addr.postalCode}
                    </div>
                  </div>
                </label>
              ))}
              {(!addresses || addresses.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No addresses saved</p>
                  <a href="/account/addresses" className="text-green-700 font-semibold hover:underline">
                    + Add an address
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Coupon */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-green-600" />
              Coupon Code
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={applyCoupon}
                disabled={couponLoading}
                className="px-5 py-2.5 gradient-green text-white rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-60"
              >
                {couponLoading ? '...' : 'Apply'}
              </button>
            </div>
            {couponData && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Coupon applied! You save {formatPrice(couponData.discountAmount)}
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit sticky top-20">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            {items.slice(0, 3).map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate flex-1 mr-2">
                  {item.product?.name} x{item.quantity}
                </span>
                <span className="font-medium flex-shrink-0">
                  {formatPrice(Number(item.product?.discountPrice || item.product?.price) * item.quantity)}
                </span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-xs text-gray-400">+{items.length - 3} more items</p>
            )}
          </div>

          <hr className="border-gray-100 my-4" />

          <div className="space-y-2 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery</span>
              <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
              </span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span className="text-green-700">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handlePlaceOrder('RAZORPAY')}
              disabled={placing || !selectedAddressId}
              id="pay-razorpay-btn"
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              Pay Online ({formatPrice(total)})
            </button>
            <button
              onClick={() => handlePlaceOrder('COD')}
              disabled={placing || !selectedAddressId}
              id="pay-cod-btn"
              className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
