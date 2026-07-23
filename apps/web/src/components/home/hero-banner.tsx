'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingCart, Star, Truck } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 min-h-[600px] flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="text-white animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Free delivery on orders above ₹500
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Fresh Groceries{' '}
              <span className="text-green-300">Delivered</span>{' '}
              to Your Door
            </h1>

            <p className="text-xl text-green-100/80 mb-10 max-w-xl leading-relaxed">
              Shop from thousands of fresh products — vegetables, fruits, dairy, and more.
              Get them delivered fresh at the best prices.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-green-900 font-bold px-8 py-4 rounded-2xl hover:bg-green-50 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                <ShoppingCart className="w-5 h-5" />
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all"
              >
                Browse Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { icon: Star, label: '4.8/5 Rating', sub: '10K+ Reviews' },
                { icon: Truck, label: 'Fast Delivery', sub: 'Same day available' },
                { icon: ShoppingCart, label: '5000+ Products', sub: 'Wide selection' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{label}</div>
                    <div className="text-green-200/70 text-xs">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Hero image placeholder with emoji cards */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { emoji: '🥦', name: 'Broccoli', price: '₹49' },
                  { emoji: '🍎', name: 'Apples', price: '₹89' },
                  { emoji: '🥕', name: 'Carrots', price: '₹35' },
                  { emoji: '🧅', name: 'Onions', price: '₹29' },
                  { emoji: '🍅', name: 'Tomatoes', price: '₹55' },
                  { emoji: '🫑', name: 'Capsicum', price: '₹65' },
                  { emoji: '🥬', name: 'Lettuce', price: '₹45' },
                  { emoji: '🫚', name: 'Olive Oil', price: '₹299' },
                  { emoji: '🥚', name: 'Eggs', price: '₹89' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 text-center hover:bg-white/20 transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-1">{item.emoji}</div>
                    <div className="text-white text-xs font-medium">{item.name}</div>
                    <div className="text-green-300 text-xs font-bold">{item.price}</div>
                  </div>
                ))}
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-2xl animate-bounce">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <div className="font-bold text-gray-900 text-xs">Express Delivery</div>
                    <div className="text-gray-500 text-xs">In 2-4 hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
