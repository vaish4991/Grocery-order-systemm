let API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
if (!API_URL.startsWith('http://') && !API_URL.startsWith('https://')) {
  API_URL = `https://${API_URL}`;
}

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor — handle 401, refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${API_URL}/api/v1/auth/refresh`, { refreshToken });
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.tokens.accessToken}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

// Auth API
export const authApi = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  verifyOtp: (data: any) => api.post('/auth/verify-otp', data),
  forgotPassword: (data: any) => api.post('/auth/forgot-password', data),
  resetPassword: (data: any) => api.post('/auth/reset-password', data),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
};

// Products API
export const productsApi = {
  getAll: (params?: any) => api.get('/products', { params }),
  getBySlug: (slug: string) => api.get(`/products/${slug}`),
  getFeatured: () => api.get('/products/featured'),
};

// Categories API
export const categoriesApi = {
  getAll: () => api.get('/categories'),
  getBySlug: (slug: string) => api.get(`/categories/${slug}`),
};

// Cart API
export const cartApi = {
  get: () => api.get('/cart'),
  addItem: (productId: string, quantity: number) =>
    api.post('/cart/items', { productId, quantity }),
  updateItem: (itemId: string, quantity: number) =>
    api.patch(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId: string) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
};

// Orders API
export const ordersApi = {
  create: (data: any) => api.post('/orders', data),
  getAll: (params?: any) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
  cancel: (id: string) => api.patch(`/orders/${id}/cancel`),
};

// Payments API
export const paymentsApi = {
  initiate: (orderId: string) => api.post(`/payments/initiate/${orderId}`),
  verify: (data: any) => api.post('/payments/verify', data),
};

// User API
export const userApi = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data: any) => api.patch('/users/me', data),
  getAddresses: () => api.get('/users/me/addresses'),
  createAddress: (data: any) => api.post('/users/me/addresses', data),
  updateAddress: (id: string, data: any) => api.patch(`/users/me/addresses/${id}`, data),
  deleteAddress: (id: string) => api.delete(`/users/me/addresses/${id}`),
};

// Reviews API
export const reviewsApi = {
  getProductReviews: (productId: string, params?: any) =>
    api.get(`/products/${productId}/reviews`, { params }),
  create: (productId: string, data: any) =>
    api.post(`/products/${productId}/reviews`, data),
  update: (id: string, data: any) => api.patch(`/reviews/${id}`, data),
  delete: (id: string) => api.delete(`/reviews/${id}`),
  getUserReviews: () => api.get('/users/me/reviews'),
};

// Coupons API
export const couponsApi = {
  apply: (code: string, orderAmount: number) =>
    api.post('/coupons/apply', { code, orderAmount }),
};
