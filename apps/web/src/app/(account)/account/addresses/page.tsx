'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { userApi } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { Plus, MapPin, Pencil, Trash2, Check, Star } from 'lucide-react';

export default function AddressesPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: addresses, refetch } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => userApi.getAddresses().then((r) => r.data),
  });

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      fullName: '', phone: '', addressLine1: '', addressLine2: '',
      city: '', state: '', postalCode: '', isDefault: false,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (editId) {
        await userApi.updateAddress(editId, data);
        toast({ title: 'Address updated!' });
      } else {
        await userApi.createAddress(data);
        toast({ title: 'Address added!' });
      }
      reset();
      setShowForm(false);
      setEditId(null);
      refetch();
    } catch {
      toast({ title: 'Error', description: 'Could not save address', variant: 'destructive' });
    }
  };

  const handleEdit = (addr: any) => {
    Object.keys(addr).forEach((k) => setValue(k as any, addr[k]));
    setEditId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await userApi.deleteAddress(id);
      toast({ title: 'Address deleted' });
      refetch();
    } catch {
      toast({ title: 'Error', variant: 'destructive', description: 'Could not delete address' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your delivery addresses</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); reset(); }}
          id="add-address-btn"
          className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-5">
            {editId ? 'Edit Address' : 'New Address'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            {[
              { id: 'fullName', label: 'Full Name', col: 2 },
              { id: 'phone', label: 'Phone', col: 1 },
              { id: 'postalCode', label: 'PIN Code', col: 1 },
              { id: 'addressLine1', label: 'Address Line 1', col: 2 },
              { id: 'addressLine2', label: 'Address Line 2 (optional)', col: 2 },
              { id: 'city', label: 'City', col: 1 },
              { id: 'state', label: 'State', col: 1 },
            ].map(({ id, label, col }) => (
              <div key={id} className={col === 2 ? 'col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  {...register(id as any)}
                  id={`addr-${id}`}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
            <div className="col-span-2 flex items-center gap-2">
              <input {...register('isDefault')} type="checkbox" id="addr-isDefault" className="accent-green-600" />
              <label htmlFor="addr-isDefault" className="text-sm font-medium text-gray-700">
                Set as default address
              </label>
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="btn-primary py-2 px-6 text-sm">
                {editId ? 'Update' : 'Save'} Address
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); reset(); }}
                className="px-6 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses list */}
      <div className="space-y-4">
        {(!addresses || addresses.length === 0) && !showForm ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No addresses saved yet.</p>
            <button onClick={() => setShowForm(true)} className="text-green-700 font-semibold text-sm hover:underline mt-2">
              Add your first address →
            </button>
          </div>
        ) : (
          (addresses || []).map((addr: any) => (
            <div key={addr.id} className={`bg-white rounded-2xl border-2 p-5 ${addr.isDefault ? 'border-green-200' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      {addr.fullName}
                      {addr.isDefault && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-2.5 h-2.5" /> Default
                        </span>
                      )}
                    </div>
                    <div className="text-gray-600 mt-0.5">{addr.phone}</div>
                    <div className="text-gray-600">{addr.addressLine1}{addr.addressLine2 && `, ${addr.addressLine2}`}</div>
                    <div className="text-gray-600">{addr.city}, {addr.state} — {addr.postalCode}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(addr)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(addr.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
