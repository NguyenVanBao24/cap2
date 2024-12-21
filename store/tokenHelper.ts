import { useAuthStore } from "./authStore";
import { useChoseState } from "./choseStore";
import { useUserData } from "./userStore";

export const getToken = () => {
  const { token } = useAuthStore.getState();
  return token;
};

export const getuserID = () => {
  const { userID } = useAuthStore.getState();

  return userID;
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

export const getFullname = () => {
  const { fullname } = useUserData.getState();

  return fullname;
};

export const getEmail = () => {
  const { email } = useUserData.getState();

  return email;
};

export const getAge = () => {
  const { age } = useUserData.getState();

  return age;
};

export const getGender = () => {
  const { gender } = useUserData.getState();

  return gender;
};
export const getHeight = () => {
  const { height } = useUserData.getState();

  return height;
};
export const getWeight = () => {
  const { weight } = useUserData.getState();
  console.log(weight, "weight");
  return weight;
};

export const getActivityByUser = () => {
  const { activityFactor } = useUserData.getState();

  return activityFactor;
};

export const getDietTypeByUser = () => {
  const { dietType } = useUserData.getState();

  return dietType;
};
export const getNutritionPlanByUser = () => {
  const { nutritionPlan } = useUserData.getState();

  return nutritionPlan;
};
