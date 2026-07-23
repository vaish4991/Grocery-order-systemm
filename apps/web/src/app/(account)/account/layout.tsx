import { redirect } from 'next/navigation';

// Shared layout for all /account/* pages with sidebar navigation
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <AccountSidebar />
        </aside>
        {/* Content */}
        <main className="lg:col-span-3">{children}</main>
      </div>
    </div>
  );
}

function AccountSidebar() {
  const links = [
    { href: '/account', label: '📊 Dashboard', exact: true },
    { href: '/account/profile', label: '👤 Profile' },
    { href: '/account/addresses', label: '📍 Addresses' },
    { href: '/account/orders', label: '📦 My Orders' },
    { href: '/account/reviews', label: '⭐ My Reviews' },
  ];

  return (
    <nav className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {links.map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          className={`flex items-center px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors ${i < links.length - 1 ? 'border-b border-gray-50' : ''}`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
