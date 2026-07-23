import { Truck, Shield, RotateCcw, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your groceries delivered in 2-4 hours. Same-day delivery available.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'We source only the freshest products directly from farms and suppliers.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Not satisfied? Return or replace within 24 hours, no questions asked.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our customer support team is always ready to help you anytime.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose GOS Grocery?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We're committed to providing the best grocery shopping experience — fresh products,
            fast delivery, and excellent service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-gray-100 card-hover text-center"
            >
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
