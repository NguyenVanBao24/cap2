import { getAllRecipesService } from "@/services/recipeService";
import { create } from "zustand";

interface RecipeStore {
  allRecipes: string | null;

  getRecipe: () => void;
}

export const useAuthStore = create<RecipeStore>((set) => ({
  allRecipes: null,
  getRecipe: async (): Promise<RecipeResponse> => {
    try {
      const response = await getAllRecipesService();
      set({ allRecipes: response.data });
      return response;
    } catch (error) {
      console.log("Login failed:", error);
      throw error;
    }
  },
}));
