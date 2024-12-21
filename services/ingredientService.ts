import axiosConfig from "@/axiosConfig";

export const getIngredientServicePage = async (): Promise<IngredientResponse> => {
  try {
    const response = await axiosConfig.get<IngredientResponse>("/ingredient?pageNo=1&pageSize=20");
    return response.data;
  } catch (error) {
    console.log("Failed to getIngredientServicePage:", error);
  }
};

export const getAllIngredientService = async (): Promise<IngredientResponse> => {
  try {
    const response = await axiosConfig.get<IngredientResponse>("/ingredient/all");
    return response.data;
  } catch (error) {
    console.log("Failed to getAllIngredientService:", error);
  }
};

export const getIngredientService = async (id: string): Promise<IngredientResponse> => {
  try {
    const response = await axiosConfig.get<IngredientResponse>(`/ingredient/${id}`);

    return response.data;
  } catch (error) {
    console.log("Failed to getIngredientService:", error);
  }
};

export const getSearchIngredientService = async (
  ingredients: string[],
  pageNo: number
): Promise<IngredientResponse> => {
  try {
    console.log(pageNo, "pageNo");
    const response = await axiosConfig.post<IngredientResponse>(
      `/recipe/searchByIngredient?pageNo=${pageNo}`,
      {
        ingredients: ingredients,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Failed to getSearchIngredientService:", error);
  }
};
