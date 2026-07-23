import type { Metadata } from 'next';
import { HeroBanner } from '@/components/home/hero-banner';
import { CategoryGrid } from '@/components/home/category-grid';
import { FeaturedProducts } from '@/components/home/featured-products';
import { OffersBanner } from '@/components/home/offers-banner';
import { WhyChooseUs } from '@/components/home/why-choose-us';

export const metadata: Metadata = {
  title: 'GOS Grocery — Fresh & Fast Grocery Delivery',
  description:
    'Order fresh vegetables, fruits, dairy, and more online. Get fast delivery to your doorstep. Best prices guaranteed.',
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <OffersBanner />
      <WhyChooseUs />
    </div>
  );
}
