'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { data: categories, isLoading, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll().then((r: any) => r.data),
  });

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setShowModal(true);
  };

  const handleOpenEdit = (cat: any) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoriesApi.update(editingCategory.id, { name, description });
      } else {
        await categoriesApi.create({ name, description });
      }
      setShowModal(false);
      refetch();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error saving category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoriesApi.delete(id);
      refetch();
    } catch (e) {
      alert('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm">Organize products into categories</p>
        </div>
        <button onClick={handleOpenCreate} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <div className="col-span-full text-center py-10 text-gray-400">Loading categories...</div>
        ) : (
          (categories || []).map((cat: any) => (
            <div key={cat.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 gradient-green text-white rounded-xl flex items-center justify-center font-bold text-lg">
                  {cat.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleOpenEdit(cat)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base">{cat.name}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description || 'No description provided'}</p>
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span>Slug: {cat.slug}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Category Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="input" />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border text-sm font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" className="btn-primary">{editingCategory ? 'Save' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
