import { loginService, signupService } from "@/services/authService";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userID: string | null;
  refreshToken: string | null;
  profile: Profile | null;
  password: string | null;
  setToken: (token: string, refreshToken: string) => void;
  logout: () => void;
  login: (username: string, password: string) => Promise<LoginResponse>;
  signup: (
    username: string,
    email: string,
    password: string,
    fullname: string
  ) => Promise<SignUpResponse>;
  setProfile: (height: number, weight: number, age: number) => void;
}

// Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  refreshToken: null,
  profile: null,
  password: null,
  userID: null,
  setToken: (token, refreshToken) => set({ token, refreshToken }),
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await loginService(username, password);

      set({
        token: response?.data?.token,
        refreshToken: response?.data?.token,
        userID: response?.data.userID,
        isLoggedIn: response?.data.authenticated,
        password: password,
      });
      return response;
    } catch (error) {
      console.log("Login failed:", error);
    }
  },
  signup: async (
    username: string,
    email: string,
    password: string,
    fullname: string
  ): Promise<SignUpResponse> => {
    try {
      const data = await signupService(username, email, password, fullname);
      console.log(data, "at 123");
      return data;
    } catch (error) {
      console.log("Sign up failed:", error);
    }
  },
  logout: () => set({ token: null, refreshToken: null, profile: null, isLoggedIn: false }),
  setProfile: (height, weight, age) => set({ profile: { height, weight, age } }),
}));
