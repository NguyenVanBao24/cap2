import axiosConfig from "@/axiosConfig";

export const getFavoriteTrending = async (): Promise<Recipe[]> => {
  try {
    const response = await axiosConfig.get<FavoriteRecipeResponse>("/favorite/trending");
    const favoriteRecipes = response.data.data;

    if (favoriteRecipes && favoriteRecipes.length > 0) {
      // Gọi API /recipe/{recipeID} cho mỗi recipeID
      const recipePromises = favoriteRecipes.map(async (favorite) => {
        const recipeID = favorite.recipeID;
        const recipeResponse = await axiosConfig.get(`/recipe/${recipeID}`);
        return recipeResponse.data.data;
      });

      // Chờ tất cả các API /recipe/{recipeID} hoàn thành
      const recipes = await Promise.all(recipePromises);
      console.log(recipes);
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
