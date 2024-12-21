// @ts-nocheck

import axiosConfig from "@/axiosConfig";

export const getAllRecipesService = async (): Promise<RecipeResponse> => {
  try {
    const response = await axiosConfig.get<RecipeResponse>("/recipe/all");

    return response.data;
  } catch (error) {
    console.log("Failed to getAllRecipesService:", error);
  }
};

export const getRecipesServiceById = async (recipe_ID: string): Promise<RecipeResponse> => {
  try {
    const response = await axiosConfig.get<RecipeResponse>(`/recipe/${recipe_ID}`);

    return response.data;
  } catch (error) {
    console.log("Failed to getRecipesServiceById:", error);
  }
};

export const getRecipesFilterService = async (
  recipe_ID: string,
  pageNo: number
): Promise<RecipeResponse> => {
  try {
    const uppercaseRecipeID = recipe_ID.toUpperCase();
    const response = await axiosConfig.get<RecipeResponse>(
      `/recipe/filter?mealType=${uppercaseRecipeID}&pageNo=${pageNo}`
    );
    return response;
  } catch (error) {
    console.log("Failed to getRecipesFilterService:", error);
  }
};

export const getRecipesByKcalService = async (
  minMacro: number,
  maxMacro: number,
  pageNo: number
): Promise<RecipeResponse> => {
  try {
    console.log(minMacro, maxMacro);
    const response = await axiosConfig.get<RecipeResponse>(
      // `/recipe/filterByMacroNutrients?macroNutrient=Calories&minMacro=${minMacro}&maxMacro=${maxMacro}&pageNo=${pageNo}&pageSize=100`
      `/recipe/filterByMacroNutrients?macroNutrient=Calories&minMacro=${minMacro}&maxMacro=${maxMacro}&pageNo=1&pageSize=100`
    );

    return response.data;
  } catch (error) {
    console.log("Failed to getRecipesByKcalService:", error);
  }
};

export const getRecipesByHard = async (
  difficultyLevel: string,
  pageNo: number
): Promise<RecipeResponse> => {
  try {
    console.log(difficultyLevel, pageNo, "pageNopageNopageNopageNopageNo");
    const response = await axiosConfig.get<RecipeResponse>(
      `/recipe/filter?difficultyLevel=${difficultyLevel}&pageNo=${pageNo}`
    );

    return response;
  } catch (error) {
    console.log("Failed to getRecipesByHard:", error);
  }
};
