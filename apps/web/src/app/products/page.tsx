import type { Metadata } from 'next';
import { ProductsListing } from '@/components/products/products-listing';

export const metadata: Metadata = {
  title: 'All Products — Fresh Groceries',
  description: 'Browse our full range of fresh groceries — vegetables, fruits, dairy, and more.',
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return <ProductsListing searchParams={searchParams} />;
}
