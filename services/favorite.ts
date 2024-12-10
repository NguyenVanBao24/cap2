import axiosConfig from "@/axiosConfig";

export const getFavoriteTrending = async (): Promise<Recipe[]> => {
  try {
    console.log("first 1");

    const response = await axiosConfig.get<FavoriteRecipeResponse>("/favorite/trending");
    console.log("first 1");
    const favoriteRecipes = response.data.data;

    if (favoriteRecipes && favoriteRecipes.length > 0) {
      const recipes: Recipe[] = [];

      for (const favorite of favoriteRecipes) {
        const recipeID = favorite.recipeID;
        const recipeResponse = await axiosConfig.get(`/recipe/${recipeID}`);
        recipes.push(recipeResponse.data.data);
      }

      console.log(recipes, "recipesrecipesrecipes");
      return recipes;
    } else {
      // Trường hợp không có favorite recipes
      return [];
    }
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    throw error;
  }
};

export const getFavoriteUserId = async (userID: string): Promise<FavoriteRecipeResponse> => {
  try {
    const response = await axiosConfig.get<FavoriteRecipeResponse>(`/favorite/user/${userID}`);
    console.log(response, "response");
    return response.data;
  } catch (error) {
    console.log("Login failed:", error);
    throw error;
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
    return response.data;
  } catch (error) {
    console.log("Login failed:", error);
    throw error;
  }
};

export const deleteFavoriteUserId = async (favoriteId: string): Promise<FavoriteRecipeResponse> => {
  try {
    const response = await axiosConfig.delete<FavoriteRecipeResponse>(`/favorite/${favoriteId}`);
    return response.data;
  } catch (error) {
    console.log("Login failed:", error);
    throw error;
  }
};
