import axiosConfig from "@/axiosConfig";

export const getAllIngredientService = async (): Promise<IngredientResponse> => {
  try {
    const response = await axiosConfig.get<IngredientResponse>("/ingredient/all");

    return response.data;
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    throw error;
  }
};

export const getIngredientService = async (id: string): Promise<IngredientResponse> => {
  try {
    const response = await axiosConfig.get<IngredientResponse>(`/ingredient/${id}`);

    return response.data;
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    throw error;
  }
};

export const getSearchIngredientService = async (
  ingredients: string[]
): Promise<IngredientResponse> => {
  try {
    const response = await axiosConfig.post<IngredientResponse>("/recipe/searchByIngredient", {
      ingredients: ingredients,
    });
    return response.data;
  } catch (error) {
    console.log("Failed to fetch recipes:", error);
    throw error;
  }
};
