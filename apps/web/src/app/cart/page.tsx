'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { cartApi } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

export default function CartPage() {
  const { setCart } = useCartStore();
  const { toast } = useToast();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get().then((r) => r.data),
  });

  useEffect(() => {
    if (data) setCart(data.items || []);
  }, [data, setCart]);

  const updateItem = async (itemId: string, quantity: number) => {
    try {
      const { data: updated } = await cartApi.updateItem(itemId, quantity);
      setCart(updated.items || []);
      refetch();
    } catch {
      toast({ title: 'Error', variant: 'destructive', description: 'Could not update cart' });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { data: updated } = await cartApi.removeItem(itemId);
      setCart(updated.items || []);
      refetch();
    } catch {}
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="skeleton rounded-2xl h-96" />
      </div>
    );
  }

  const items = data?.items || [];
  const totalAmount = data?.totalAmount || 0;
  const deliveryCharge = totalAmount > 500 ? 0 : 40;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some fresh groceries to get started!</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({items.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item: any) => {
            const price = Number(item.product?.discountPrice || item.product?.price || 0);
            const image = item.product?.images?.[0]?.imageUrl;

            return (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
                <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  {image ? (
                    <Image src={image} alt={item.product?.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🛒</div>
                  )}
                </div>

                <div className="flex-1">
                  <Link href={`/products/${item.product?.slug}`} className="font-semibold text-gray-900 hover:text-green-700 line-clamp-2 text-sm">
                    {item.product?.name}
                  </Link>
                  <div className="text-green-700 font-bold mt-1">{formatPrice(price)}</div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-xl">
                      <button
                        onClick={() => updateItem(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-l-xl"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-r-xl"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">
                        {formatPrice(price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit sticky top-20">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery Charge</span>
              <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
              </span>
            </div>
            {deliveryCharge > 0 && (
              <p className="text-xs text-gray-400">Add {formatPrice(500 - totalAmount)} more for free delivery</p>
            )}
            <hr className="border-gray-100" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-green-700">{formatPrice(totalAmount + deliveryCharge)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-center"
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link href="/products" className="block text-center text-sm text-gray-500 hover:text-green-700 mt-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
