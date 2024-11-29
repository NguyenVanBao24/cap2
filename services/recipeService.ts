// recipeService.ts
import axiosConfig from "@/axiosConfig";

export const getAllRecipesService = async (): Promise<RecipeResponse> => {
  try {
    const response = await axiosConfig.get<RecipeResponse>("/recipe/all");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    throw error;
  }
};

export const getRecipesServiceById = async (recipe_ID: string): Promise<RecipeResponse> => {
  try {
    const response = await axiosConfig.get<RecipeResponse>(`/recipe/${recipe_ID}`);

    return response.data;
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    throw error;
  }
};

export const getRecipesFilterService = async (recipe_ID: string): Promise<RecipeResponse> => {
  try {
    const uppercaseRecipeID = recipe_ID.toUpperCase();
    const response = await axiosConfig.get<RecipeResponse>(
      `/recipe/filter?mealType=${uppercaseRecipeID}`
    );

    return response.data;
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    throw error;
  }
};

export const getRecipesByKcalService = async (
  minMacro: number,
  maxMacro: number
): Promise<RecipeResponse> => {
  try {
    const response = await axiosConfig.get<RecipeResponse>(
      `/recipe/filterByMacroNutrients?macroNutrient=Calories&minMacro=${minMacro}&maxMacro=${maxMacro}`
    );

    return response.data;
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    throw error;
  }
};
