import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'GOS Grocery — Fresh & Fast Delivery',
    template: '%s | GOS Grocery',
  },
  description:
    'Order fresh groceries online and get them delivered to your door. Wide selection of fruits, vegetables, dairy, meat, and more.',
  keywords: ['grocery delivery', 'fresh vegetables', 'online grocery', 'GOS grocery'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://gosgrocery.com',
    siteName: 'GOS Grocery',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
