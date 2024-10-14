// src/store/useBearStore.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// Định nghĩa kiểu dữ liệu cho `bear` state
interface BearState {
  bears: number;
  increase: () => void;
  reset: () => void;
}

// Tạo store `bear` với `zustand`, tích hợp `persist` và `devtools`
const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: () => set((state) => ({ bears: state.bears + 1 })),
        reset: () => set({ bears: 0 }),
      }),
      { name: "bear-storage" }
    )
  )
);

export default useBearStore;
