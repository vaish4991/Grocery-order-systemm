'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAdminStore } from '@/lib/store';
import {
  LayoutDashboard, Package, Tag, ShoppingCart, Users, Ticket, LogOut,
  Leaf, BarChart3, Bell, Settings
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/categories', label: 'Categories', icon: Tag },
  { href: '/dashboard/coupons', label: 'Coupons', icon: Ticket },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
];

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout } = useAdminStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-[#0f172a] flex flex-col h-screen sticky top-0 flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 gradient-green rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">GOS Grocery</div>
            <div className="text-gray-400 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-green-600 text-white shadow-lg shadow-green-900/30'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Admin user + logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl mb-1">
          <div className="w-8 h-8 gradient-green rounded-xl flex items-center justify-center text-white text-sm font-bold">
            {admin?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <div className="text-white text-xs font-semibold truncate">{admin?.name}</div>
            <div className="text-gray-500 text-xs truncate">{admin?.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

function TopBar() {
  const pathname = usePathname();
  const pageName = NAV_ITEMS.find((n) => pathname.startsWith(n.href))?.label || 'Dashboard';

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-lg font-bold text-gray-900">{pageName}</h1>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
