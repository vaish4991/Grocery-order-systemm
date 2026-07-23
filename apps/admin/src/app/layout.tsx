import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AdminProviders } from '@/components/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'GOS Admin', template: '%s | GOS Admin' },
  description: 'GOS Grocery Admin Dashboard',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <AdminProviders>{children}</AdminProviders>
      </body>
    </html>
  );
}
