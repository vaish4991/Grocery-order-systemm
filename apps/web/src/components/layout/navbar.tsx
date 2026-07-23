'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Leaf } from 'lucide-react';
import { useAuthStore, useCartStore } from '@/lib/store';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { totalItems } = useCartStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { href: '/collections', label: 'Categories' },
    { href: '/products', label: 'Products' },
    { href: '/offers', label: '🔥 Offers' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 gradient-green rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-gradient">GOS Grocery</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-green-700 font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-green-50 rounded-xl transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 gradient-green text-white text-xs font-bold rounded-full flex items-center justify-center animate-fade-in">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 hover:bg-green-50 rounded-xl transition-colors text-sm">
                  <User className="w-4 h-4 text-gray-700" />
                  <span className="hidden md:block text-gray-700 font-medium">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    My Account
                  </Link>
                  <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Orders
                  </Link>
                  <Link href="/account/addresses" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Addresses
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={() => { logout(); router.push('/'); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn-primary text-sm py-2 px-4"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for groceries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none"
                />
              </div>
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
