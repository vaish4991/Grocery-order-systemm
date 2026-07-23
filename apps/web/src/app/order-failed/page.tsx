'use client';

import Link from 'next/link';
import { XCircle, RefreshCw, ShoppingCart } from 'lucide-react';

export default function OrderFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-14 h-14 text-red-500" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Failed</h1>
          <p className="text-gray-500 mb-8">
            Something went wrong with your payment. Don't worry — your cart is safe and no amount
            was deducted.
          </p>

          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8 text-sm text-red-700">
            Common reasons: insufficient funds, network timeout, or card decline.
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Link>
            <Link
              href="/cart"
              className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Back to Cart
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Need help?{' '}
            <Link href="/contact" className="text-green-700 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
