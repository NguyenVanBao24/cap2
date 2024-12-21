// @ts-nocheck

import { getAllRecipesService } from "@/services/recipeService";
import { create } from "zustand";
import { getuserID } from "./tokenHelper";
import { getFavoriteUserId } from "@/services/favorite";

const userId = getuserID();
interface RecipeStore {
  allRecipes: string | null;

  getRecipe: () => void;
}

export const useAuthStore = create<RecipeStore>((set) => ({
  allRecipes: null,
  getRecipe: async (): Promise<any> => {
    try {
      const response = await getFavoriteUserId(userId);
      set({ allRecipes: response.data });
      return response;
    } catch (error) {
      console.log("Login failed:", error);
    }
  },
}));
