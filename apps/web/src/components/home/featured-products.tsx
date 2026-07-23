'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { productsApi, cartApi } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import { ShoppingCart, Star, Plus, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

function ProductCard({ product }: { product: any }) {
  const [adding, setAdding] = useState(false);
  const { setCart } = useCartStore();
  const { toast } = useToast();

  const price = Number(product.price);
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
  const discount = discountPrice ? getDiscountPercent(price, discountPrice) : 0;
  const image = product.images?.[0]?.imageUrl;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const { data } = await cartApi.addItem(product.id, 1);
      setCart(data.items);
      toast({ title: 'Added to cart!', description: product.name });
    } catch {
      toast({ title: 'Error', description: 'Could not add to cart', variant: 'destructive' });
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            🛒
          </div>
        )}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-900 text-sm font-bold px-3 py-1 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-500">{product.averageRating?.toFixed(1) || '—'}</span>
          <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="font-bold text-gray-900">
              {discountPrice ? formatPrice(discountPrice) : formatPrice(price)}
            </div>
            {discountPrice && (
              <div className="text-xs text-gray-400 line-through">{formatPrice(price)}</div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className="w-9 h-9 gradient-green text-white rounded-xl flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-all hover:scale-110 active:scale-95"
          >
            {adding ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productsApi.getFeatured().then((r) => r.data),
  });

  const products = data || [];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">⭐ Featured Products</h2>
          <p className="text-gray-500 mt-1">Our best-selling and most loved groceries</p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1 text-green-700 font-semibold hover:gap-2 transition-all text-sm"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, i) => <div key={i} className="skeleton rounded-2xl h-64" />)
          : products.map((p: any) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
