import axiosConfig from "@/axiosConfig";

export const getTrackingAll = async (): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/daily-tracking`);

    return response;
  } catch (error) {
    console.log("Failed to fetch getTrackingAll", error);
    throw error;
  }
};

export const getTrackingNutritionID = async (nutritionId: string): Promise<any> => {
  try {
    console.log(nutritionId, "nutritionIdnutritionIdnutritionId");
    const response = await axiosConfig.get(`/daily-tracking/${nutritionId}`);

    return response;
  } catch (error) {
    console.log("Failed to fetch getTrackingNutritionID:", error);
    throw error;
  }
};

export const getTrackingByUserIDDate = async (userID: string, date: string): Promise<any> => {
  try {
    const response = await axiosConfig.get(`/daily-tracking/detail/${userID}`, {
      params: { date },
    });

    return response;
  } catch (error) {
    console.log("Failed to fetch getTrackingByUserIDDate:", error);
    throw error;
  }
};

export const postTrackingByUserIDDate = async (
  requestBody: RecipePlan
): Promise<NutritionTrackingResponse> => {
  try {
    const response = await axiosConfig.post(`/daily-tracking`, requestBody);
    return response.data;
  } catch (error) {
    console.log("Failed to post tracking data:", error);
    throw error;
  }
};

export const putTrackingByUserIDDate = async (
  nutritionId: string,
  requestBody: RecipePlan
): Promise<NutritionTrackingResponse> => {
  try {
    const response = await axiosConfig.put(`/daily-tracking/${nutritionId}`, requestBody);
    return response.data;
  } catch (error) {
    console.log("Failed to put tracking data:", error);
    throw error;
  }
};

export const deleteTrackingByID = async (
  nutritionId: string
): Promise<NutritionTrackingResponse> => {
  try {
    const response = await axiosConfig.delete(`/daily-tracking/${nutritionId}`);
    return response.data;
  } catch (error) {
    console.log("Failed to put tracking data:", error);
    throw error;
  }
};
