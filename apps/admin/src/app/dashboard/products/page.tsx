'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi, categoriesApi } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const { data: productsData, isLoading, refetch } = useQuery({
    queryKey: ['admin-products', search],
    queryFn: () => productsApi.list({ search: search || undefined }).then((r) => r.data),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll().then((r) => r.data),
  });

  const products = productsData?.products || [];

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setName('');
    setCategoryId(categories?.[0]?.id || '');
    setPrice('');
    setDiscountPrice('');
    setStock('');
    setDescription('');
    setShowModal(true);
  };

  const handleOpenEdit = (prod: any) => {
    setEditingProduct(prod);
    setName(prod.name);
    setCategoryId(prod.categoryId);
    setPrice(prod.price.toString());
    setDiscountPrice(prod.discountPrice ? prod.discountPrice.toString() : '');
    setStock(prod.stock.toString());
    setDescription(prod.description || '');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      categoryId,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      stock: Number(stock),
      description,
    };

    try {
      if (editingProduct) {
        await productsApi.update(editingProduct.id, payload);
      } else {
        await productsApi.create(payload);
      }
      setShowModal(false);
      refetch();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productsApi.delete(id);
      refetch();
    } catch (e) {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Catalog</h1>
          <p className="text-gray-500 text-sm">Manage inventory, prices and product listings</p>
        </div>
        <button onClick={handleOpenCreate} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="input pl-10"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">No products found</td>
                </tr>
              ) : (
                products.map((prod: any) => (
                  <tr key={prod.id} className="table-row">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                        {prod.images?.[0]?.imageUrl ? (
                          <img src={prod.images[0].imageUrl} alt="" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          '🛒'
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{prod.name}</div>
                        <div className="text-xs text-gray-400">{prod.sku || 'No SKU'}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{prod.category?.name || '—'}</td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">
                        {prod.discountPrice ? formatPrice(Number(prod.discountPrice)) : formatPrice(Number(prod.price))}
                      </div>
                      {prod.discountPrice && (
                        <div className="text-xs text-gray-400 line-through">{formatPrice(Number(prod.price))}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        prod.stock > 10 ? 'bg-green-50 text-green-700' : prod.stock > 0 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {prod.stock} in stock
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleOpenEdit(prod)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(prod.id)} className="p-2 hover:bg-red-50 rounded-xl text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Product Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="input">
                  <option value="">Select Category</option>
                  {(categories || []).map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Discount Price (₹)</label>
                  <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Stock</label>
                  <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="input" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="input" />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border text-sm font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" className="btn-primary">{editingProduct ? 'Update Product' : 'Create Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
