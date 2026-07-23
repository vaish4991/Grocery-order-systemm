import Link from 'next/link';
import { Tag, ArrowRight } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: '50% OFF on Fresh Vegetables',
    subtitle: 'Limited time — use code FRESH50',
    code: 'FRESH50',
    gradient: 'from-green-600 to-emerald-500',
    emoji: '🥦',
  },
  {
    id: 2,
    title: 'Free Delivery on First Order',
    subtitle: 'New customers only — auto-applied',
    code: 'FIRSTFREE',
    gradient: 'from-blue-600 to-cyan-500',
    emoji: '🚚',
  },
  {
    id: 3,
    title: '20% OFF Dairy Products',
    subtitle: 'All milk, cheese, eggs & yogurt',
    code: 'DAIRY20',
    gradient: 'from-yellow-500 to-orange-500',
    emoji: '🥛',
  },
];

export function OffersBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">🔥 Hot Offers</h2>
          <p className="text-gray-500 mt-1">Limited time deals you don't want to miss</p>
        </div>
        <Link
          href="/offers"
          className="flex items-center gap-1 text-green-700 font-semibold hover:gap-2 transition-all text-sm"
        >
          All Offers <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`relative bg-gradient-to-br ${offer.gradient} rounded-3xl p-6 text-white overflow-hidden card-hover`}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 text-8xl opacity-20 -translate-y-2 translate-x-4">
              {offer.emoji}
            </div>

            <div className="relative">
              <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
              <p className="text-white/80 text-sm mb-4">{offer.subtitle}</p>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5">
                  <Tag className="w-3 h-3" />
                  <span className="text-sm font-bold">{offer.code}</span>
                </div>
                <Link
                  href="/products"
                  className="flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                >
                  Shop Now <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
