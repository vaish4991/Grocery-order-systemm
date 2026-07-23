'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { productsApi, cartApi, reviewsApi } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, Minus, Plus, Truck, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const { setCart } = useCartStore();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.slug],
    queryFn: () => productsApi.getBySlug(params.slug).then((r) => r.data),
  });

  const { data: reviewsData } = useQuery({
    queryKey: ['reviews', product?.id],
    queryFn: () => reviewsApi.getProductReviews(product.id).then((r) => r.data),
    enabled: !!product?.id,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="skeleton rounded-3xl aspect-square" />
          <div className="space-y-4">
            <div className="skeleton rounded-xl h-8 w-3/4" />
            <div className="skeleton rounded-xl h-6 w-1/2" />
            <div className="skeleton rounded-xl h-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return notFound();

  const price = Number(product.price);
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
  const discount = discountPrice ? getDiscountPercent(price, discountPrice) : 0;
  const images = product.images || [];
  const reviews = reviewsData?.reviews || [];

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const { data } = await cartApi.addItem(product.id, quantity);
      setCart(data.items);
      toast({ title: 'Added to cart!', description: `${quantity}x ${product.name}` });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Could not add to cart',
        variant: 'destructive',
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden mb-4">
            {images[selectedImage] ? (
              <Image
                src={images[selectedImage].imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🛒</div>
            )}
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1.5 rounded-xl text-sm">
                -{discount}% OFF
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <Image src={img.imageUrl} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="text-sm text-green-700 font-medium mb-2">
            {product.category?.name}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= Math.round(product.averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.averageRating?.toFixed(1) || 'No reviews'}</span>
            <span className="text-sm text-gray-500">({product.reviewCount || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">
              {discountPrice ? formatPrice(discountPrice) : formatPrice(price)}
            </span>
            {discountPrice && (
              <span className="text-xl text-gray-400 line-through">{formatPrice(price)}</span>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-green-700 font-medium text-sm bg-green-50 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-red-600 font-medium text-sm bg-red-50 px-3 py-1.5 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Quantity & Add to Cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-l-xl"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-r-xl"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                id="add-to-cart-btn"
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 text-base"
              >
                {adding ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          )}

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="w-4 h-4 text-green-600" />
              Free delivery above ₹500
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              Quality guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review: any) => (
              <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-900">{review.user?.name}</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                {review.comment && <p className="text-gray-600 text-sm">{review.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
