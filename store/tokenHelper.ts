import { useAuthStore } from "./authStore";
import { useChoseState } from "./choseStore";

export const getToken = () => {
  const { token } = useAuthStore.getState();
  return token;
};

export const getuserID = () => {
  const { userID } = useAuthStore.getState();

  return userID || "1332d0f1-09ad-4f2b-9163-ade271d88bb2";
};

export const getRefreshToken = () => {
  const { refreshToken } = useAuthStore.getState();
  return refreshToken;
};

export const setTokens = (token: string, refreshToken: string) => {
  useAuthStore.setState({ token, refreshToken });
};

export const getNutritionPlanValue = () => {
  const { NutritionPlan } = useChoseState.getState();

  return NutritionPlan?.data;
};

export const getActivityFactor = () => {
  const { ActivityFactor } = useChoseState.getState();

  return ActivityFactor?.data;
};
export const getDietType = () => {
  const { DietType } = useChoseState.getState();

  return DietType?.data;
};
