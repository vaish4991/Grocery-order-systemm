import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthState {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (admin: AdminUser, token: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      login: (admin, token) => {
        localStorage.setItem('adminToken', token);
        set({ admin, token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('adminToken');
        set({ admin: null, token: null, isAuthenticated: false });
      },
    }),
    { name: 'gos-admin', partialize: (s) => ({ admin: s.admin, isAuthenticated: s.isAuthenticated }) },
  ),
);
