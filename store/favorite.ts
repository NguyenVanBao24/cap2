import { deleteFavoriteUserId, getFavoriteUserId, postFavoriteUserId } from "@/services/favorite";
import { create } from "zustand";

interface RecipeStore {
  allUserFavorite: string | null;
  getFavorite: (userID: string) => Promise<any>;
  postFavorite: (userID: string, recipeID: string) => Promise<any>;
  deleteFavorite: (userID: string, recipeID: string) => Promise<any>;
}

export const useFavoriteStore = create<RecipeStore>((set, get) => ({
  allUserFavorite: null,
  getFavorite: async (userID: string): Promise<any> => {
    try {
      const response = await getFavoriteUserId(userID);
      set({ allUserFavorite: response.data });
      console.log("get favorite success:", response.data);

      return response;
    } catch (error) {
      console.log("get favorite failed:", error);
      throw error;
    }
  },
  postFavorite: async (userID: string, recipeID: string): Promise<any> => {
    try {
      await postFavoriteUserId(userID, recipeID);
      const responseGet = await getFavoriteUserId(userID);
      set({ allUserFavorite: responseGet.data });
      return responseGet;
    } catch (error) {
      console.log("post favorite failed:", error);
      throw error;
    }
  },
  deleteFavorite: async (userID: string, recipeID: string): Promise<any> => {
    try {
      console.log(userID, recipeID, "aaaaaaaaaaaaaaaa");
      const re = await deleteFavoriteUserId(recipeID);
      const responseGet = await getFavoriteUserId(userID);
      set({ allUserFavorite: responseGet.data });
      return responseGet;
    } catch (error) {
      console.log("post favorite failed:", error);
      throw error;
    }
  },
}));
