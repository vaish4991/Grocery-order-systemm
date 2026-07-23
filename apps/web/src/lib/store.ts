import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      login: (user, tokens) => {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        set({ user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },
      updateUser: (updates) =>
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
    }),
    {
      name: 'gos-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
);

// Cart store
interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  setCart: (items: CartItem[]) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  totalItems: 0,
  totalAmount: 0,
  setCart: (items) =>
    set({
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
  clear: () => set({ items: [], totalItems: 0, totalAmount: 0 }),
}));
