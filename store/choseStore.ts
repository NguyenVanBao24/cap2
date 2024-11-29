import { getNutritionPlan, getActivityFactor, getDietType } from "@/services/chose";
import { create } from "zustand";

interface ChoseState {
  NutritionPlan: string | null;
  ActivityFactor: string | null;
  DietType: string | null;
  chose: () => Promise<any>;
}

// Zustand store
export const useChoseState = create<ChoseState>((set) => ({
  NutritionPlan: null,
  ActivityFactor: null,
  DietType: null,
  chose: async (): Promise<any> => {
    try {
      const [nutritionPlanRes, activityFactorRes, dietTypeRes] = await Promise.all([
        getNutritionPlan(),
        getActivityFactor(),
        getDietType(),
      ]);

      set({
        NutritionPlan: nutritionPlanRes.data,
        ActivityFactor: activityFactorRes.data,
        DietType: dietTypeRes.data,
      });
    } catch (error) {
      console.log("chose failed:", error);
      throw error;
    }
  },
}));
