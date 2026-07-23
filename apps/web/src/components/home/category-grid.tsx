'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

const CATEGORY_EMOJIS: Record<string, string> = {
  'fruits-vegetables': '🥦',
  'dairy-eggs': '🥛',
  'meat-seafood': '🥩',
  beverages: '🥤',
  bakery: '🍞',
  snacks: '🍿',
  'personal-care': '🧴',
  cleaning: '🧹',
};

const CATEGORY_COLORS: Record<string, string> = {
  'fruits-vegetables': 'from-green-400 to-emerald-500',
  'dairy-eggs': 'from-yellow-300 to-amber-400',
  'meat-seafood': 'from-red-400 to-rose-500',
  beverages: 'from-blue-400 to-cyan-500',
  bakery: 'from-orange-400 to-amber-500',
  snacks: 'from-purple-400 to-violet-500',
  'personal-care': 'from-pink-400 to-rose-400',
  cleaning: 'from-teal-400 to-cyan-500',
};

export function CategoryGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll().then((r) => r.data),
  });

  const categories = data || [];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-500 mt-1">Fresh products across all categories</p>
        </div>
        <Link
          href="/collections"
          className="flex items-center gap-1 text-green-700 font-semibold hover:gap-2 transition-all text-sm"
        >
          All Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="skeleton rounded-2xl h-28" />
              ))
          : categories.slice(0, 8).map((cat: any) => (
              <Link
                key={cat.id}
                href={`/products?categoryId=${cat.id}`}
                className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md card-hover text-center"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${CATEGORY_COLORS[cat.slug] || 'from-green-400 to-emerald-500'} rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform duration-200`}
                >
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-8 h-8 object-contain" />
                  ) : (
                    CATEGORY_EMOJIS[cat.slug] || '🛒'
                  )}
                </div>
                <span className="text-xs font-semibold text-gray-700 leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
      </div>
    </section>
  );
}
