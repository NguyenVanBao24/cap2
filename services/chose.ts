import axiosConfig from "@/axiosConfig";

export const getNutritionPlan = async (): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/nutrition-plan/all`);

    return response;
  } catch (error) {
    console.log("Failed to fetch tracking data:", error);
    throw error;
  }
};

export const getActivityFactor = async (): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/activity-factor/all`);

    return response;
  } catch (error) {
    console.log("Failed to fetch tracking data:", error);
    throw error;
  }
};

export const getDietType = async (): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/diet-type/all`);

    return response;
  } catch (error) {
    console.log("Failed to fetch tracking data:", error);
    throw error;
  }
};

export const getNutritionCalculation = async (userId: string): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/nutritional-calculation/getCalculation/${userId}`);
    console.log(response.data, "responseresponse");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch tracking data:", error);
    throw error;
  }
};
