import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Định nghĩa interface cho dữ liệu người dùng
interface UserData {
  password: string | null;
  email: string | null;
  fullname: string | null;
  age: number | null;
  gender: boolean | null;
  weight: number | null;
  height: number | null;
  activityFactor: string | null;
  nutritionPlan: string | null;
  dietType: string | null;
  setUserData: (data: Partial<UserData>) => void;
}

// Zustand store với persist middleware và AsyncStorage
export const useUserData = create<UserData>()(
  persist(
    (set) => ({
      password: null,
      email: null,
      fullname: null,
      age: null,
      gender: null,
      weight: null,
      height: null,
      activityFactor: null,
      nutritionPlan: null,
      dietType: null,

      setUserData: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: "user-data", // Tên lưu trữ trong AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Tạo storage từ AsyncStorage
    }
  )
);
