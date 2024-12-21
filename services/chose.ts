import axiosConfig from "@/axiosConfig";

export const getNutritionPlan = async (): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/nutrition-plan/all`);

    return response;
  } catch (error) {
    console.log("Failed to getNutritionPlan:", error);
  }
};

export const getNutritionPlanByDietType = async (dietType: string): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/nutrition-plan/filterByDietType/${dietType}`);

    return response.data;
  } catch (error) {
    console.log("Failed to getNutritionPlanByDietType:", error);
  }
};

export const getNutritionPlanByNutritionName = async (NutritionPlanName: string): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/nutrition-plan/${NutritionPlanName}`);
    return response.data;
  } catch (error) {
    console.log("Failed to getNutritionPlanByNutritionName:", error);
  }
};

export const getActivityFactor = async (): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/activity-factor/all`);

    return response;
  } catch (error) {
    console.log("Failed to getActivityFactor:", error);
  }
};

export const getDietType = async (): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/diet-type/all`);

    return response;
  } catch (error) {
    console.log("Failed to getDietType:", error);
  }
};

export const getNutritionCalculation = async (userId: string): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/nutritional-calculation/getCalculation/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Failed to getNutritionCalculation:", error);
  }
};
export const getRecipeCalculation = async (userId: string): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/nutritional-calculation/getRecipe/${userId}`);

    return response.data;
  } catch (error) {
    console.log("Failed to getRecipeCalculation:", error);
  }
};
