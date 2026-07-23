'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { productsApi, cartApi } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import { Filter, SlidersHorizontal, Search, Star, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export function ProductsListing({ searchParams }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchParams.q || '');
  const [categoryId, setCategoryId] = useState(searchParams.categoryId || '');
  const [sortBy, setSortBy] = useState('');
  const [inStock, setInStock] = useState(false);
  const { setCart } = useCartStore();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['products', { search, categoryId, sortBy, inStock, page }],
    queryFn: () =>
      productsApi
        .getAll({ search: search || undefined, categoryId: categoryId || undefined, sortBy: sortBy || undefined, inStock: inStock || undefined, page })
        .then((r) => r.data),
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const handleAddToCart = async (productId: string, name: string) => {
    try {
      const { data } = await cartApi.addItem(productId, 1);
      setCart(data.items);
      toast({ title: 'Added to cart!', description: name });
    } catch {
      toast({ title: 'Error', description: 'Could not add to cart', variant: 'destructive' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-500">Fresh groceries, delivered to your door</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm cursor-pointer hover:bg-gray-50">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => { setInStock(e.target.checked); setPage(1); }}
            className="accent-green-600"
          />
          In Stock Only
        </label>
      </div>

      {/* Results count */}
      {!isLoading && (
        <p className="text-sm text-gray-500 mb-6">
          Showing {products.length} of {data?.total || 0} products
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
        {isLoading
          ? Array(20).fill(0).map((_, i) => <div key={i} className="skeleton rounded-2xl h-64" />)
          : products.map((product: any) => {
              const price = Number(product.price);
              const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
              const discount = discountPrice ? getDiscountPercent(price, discountPrice) : 0;
              const image = product.images?.[0]?.imageUrl;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover flex flex-col"
                >
                  <div className="relative aspect-square bg-gray-50">
                    {image ? (
                      <Image src={image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">🛒</div>
                    )}
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-500">{product.averageRating?.toFixed(1) || '—'}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm">
                          {discountPrice ? formatPrice(discountPrice) : formatPrice(price)}
                        </span>
                        {discountPrice && (
                          <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(price)}</span>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product.id, product.name); }}
                        disabled={product.stock === 0}
                        className="w-8 h-8 gradient-green text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-40"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                page === p ? 'gradient-green text-white shadow-md' : 'border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
