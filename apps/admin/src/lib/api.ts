let API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
if (!API_URL.startsWith('http://') && !API_URL.startsWith('https://')) {
  API_URL = `https://${API_URL}`;
}

export const adminApi = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
});

adminApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// Auth
export const authApi = {
  login: (data: any) => adminApi.post('/auth/login', data),
};

// Dashboard
export const dashboardApi = {
  getStats: () => adminApi.get('/admin/dashboard/stats'),
};

// Products
export const productsApi = {
  getAll: (params?: any) => adminApi.get('/admin/products', { params }),
  getById: (id: string) => adminApi.get(`/admin/products/${id}`),
  create: (data: any) => adminApi.post('/admin/products', data),
  update: (id: string, data: any) => adminApi.patch(`/admin/products/${id}`, data),
  delete: (id: string) => adminApi.delete(`/admin/products/${id}`),
  // Public endpoint for listing
  list: (params?: any) => adminApi.get('/products', { params }),
};

// Categories
export const categoriesApi = {
  getAll: () => adminApi.get('/categories'),
  create: (data: any) => adminApi.post('/admin/categories', data),
  update: (id: string, data: any) => adminApi.patch(`/admin/categories/${id}`, data),
  delete: (id: string) => adminApi.delete(`/admin/categories/${id}`),
};

// Orders
export const ordersApi = {
  getAll: (params?: any) => adminApi.get('/admin/orders', { params }),
  getById: (id: string) => adminApi.get(`/admin/orders/${id}`),
  updateStatus: (id: string, status: string) =>
    adminApi.patch(`/admin/orders/${id}/status`, { status }),
};

// Coupons
export const couponsApi = {
  getAll: () => adminApi.get('/admin/coupons'),
  create: (data: any) => adminApi.post('/admin/coupons', data),
  update: (id: string, data: any) => adminApi.patch(`/admin/coupons/${id}`, data),
  delete: (id: string) => adminApi.delete(`/admin/coupons/${id}`),
};

// Upload
export const uploadApi = {
  getPresignedUrl: (data: any) => adminApi.post('/upload/presigned-url', data),
};
