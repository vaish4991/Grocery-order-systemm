'use client';

import { Users, Mail, Phone, Calendar } from 'lucide-react';

export default function AdminCustomersPage() {
  const mockCustomers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '9876543210', orders: 5, totalSpent: 2450, joined: '2026-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', orders: 12, totalSpent: 6800, joined: '2026-02-01' },
    { id: '3', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543212', orders: 2, totalSpent: 990, joined: '2026-03-10' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Directory</h1>
        <p className="text-gray-500 text-sm">View registered users and purchasing statistics</p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {mockCustomers.map((cust) => (
                <tr key={cust.id} className="table-row">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 gradient-green text-white rounded-xl flex items-center justify-center font-bold text-sm">
                      {cust.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{cust.name}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-800 text-xs flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {cust.email}</div>
                    <div className="text-gray-500 text-xs flex items-center gap-1.5 mt-0.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> +91 {cust.phone}</div>
                  </td>
                  <td className="p-4 font-semibold text-gray-800">{cust.orders} orders</td>
                  <td className="p-4 font-bold text-green-700">₹{cust.totalSpent}</td>
                  <td className="p-4 text-xs text-gray-500">{cust.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
