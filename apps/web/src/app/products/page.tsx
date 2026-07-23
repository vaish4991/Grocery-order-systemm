import type { Metadata } from 'next';
import { ProductsListing } from '@/components/products/products-listing';

export const metadata: Metadata = {
  title: 'All Products — Fresh Groceries',
  description: 'Browse our full range of fresh groceries — vegetables, fruits, dairy, and more.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await searchParams;
  return <ProductsListing searchParams={resolvedParams} />;
}
