// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginAPI, logoutAPI } from "../api/auth"; // Import các hàm API từ `auth.ts`
import asyncStorage from "./asyncStorage";
// Định nghĩa kiểu dữ liệu cho `auth` state
interface AuthState {
  user: string | null;
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      isLoading: false,
      error: null,
      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await loginAPI(username, password);
          set({ user, token, isLoading: false, isLoggedIn: true });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutAPI(); // Nếu cần
          set({ user: null, token: null, isLoading: false });
          console.log("User after logout:", get().user); // Kiểm tra giá trị user
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: asyncStorage,
    }
  )
);

export default useAuthStore;
