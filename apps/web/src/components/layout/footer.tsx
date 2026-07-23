import Link from 'next/link';
import { Leaf, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gradient-green rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">GOS Grocery</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              Your one-stop destination for fresh groceries delivered right to your doorstep.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-green-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-green-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-green-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/collections', label: 'Categories' },
                { href: '/products', label: 'All Products' },
                { href: '/offers', label: 'Offers' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-green-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-4">My Account</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/account', label: 'Dashboard' },
                { href: '/account/orders', label: 'My Orders' },
                { href: '/account/profile', label: 'Profile' },
                { href: '/account/addresses', label: 'Addresses' },
                { href: '/cart', label: 'Cart' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-green-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>+91 9000000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>support@gosgrocery.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>123, Market Street, Mumbai, Maharashtra 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} GOS Grocery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
            <Link href="/refund" className="hover:text-gray-300">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
