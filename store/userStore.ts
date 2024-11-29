import { boolean } from "yup";
import { create } from "zustand";

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

// Zustand store
export const useUserData = create<UserData>((set) => ({
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
}));
