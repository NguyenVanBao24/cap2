// @ts-nocheck

import axiosConfig from "@/axiosConfig";

export const getFavoriteTrending = async (): Promise<Recipe[]> => {
  try {
    const response = await axiosConfig.get<FavoriteRecipeResponse>("/favorite/trending");
    const favoriteRecipes = response.data.data;

    if (favoriteRecipes && favoriteRecipes.length > 0) {
      const recipes: Recipe[] = [];

      for (const favorite of favoriteRecipes) {
        const recipeID = favorite.recipeID;
        const recipeResponse = await axiosConfig.get(`/recipe/${recipeID}`);
        recipes.push(recipeResponse.data.data);
      }

      return recipes;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Failed to getFavoriteTrending:", error);
  }
};

export const getFavoriteUserId = async (userID: string): Promise<FavoriteRecipeResponse> => {
  try {
    const response = await axiosConfig.get<FavoriteRecipeResponse>(`/favorite/user/${userID}`);
    return response.data;
  } catch (error) {
    console.log("Failed to getFavoriteUserId:", error);
  }
};

export const postFavoriteUserId = async (
  userID: string,
  recipeID: string
): Promise<FavoriteRecipeResponse> => {
  try {
    const response = await axiosConfig.post<FavoriteRecipeResponse>(`/favorite`, {
      userID,
      recipeID,
    });

    console.log(response.data, "from post");
    return response.data;
  } catch (error) {
    console.log("Failed to postFavoriteUserId:", error);
  }
};

export const deleteFavoriteUserId = async (favoriteId: string): Promise<FavoriteRecipeResponse> => {
  try {
    const response = await axiosConfig.delete<FavoriteRecipeResponse>(`/favorite/${favoriteId}`);
    console.log(response.data, favoriteId, "deleteFavoriteUserId");
    return response.data;
  } catch (error) {
    console.log("Failed to deleteFavoriteUserId:", error);
  }
};
