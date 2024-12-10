import axiosConfig from "@/axiosConfig";

export const loginService = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosConfig.post<LoginResponse>("/auth/user/login", {
      username: username,
      password: password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Login failed:", error);
    throw error;
  }
};
export const signupService = async (
  username: string,
  email: string,
  password: string,
  fullname: string
): Promise<SignUpResponse> => {
  console.log("first", username, email, password, fullname);
  try {
    const response = await axiosConfig.post<SignUpResponse>("/user", {
      username: username,
      email: email,
      password: password,
      fullname: fullname,
    });

    return response.data;
  } catch (error) {
    console.log("Login failed:", error);
    throw error;
  }
};

export const getUserInformationPlan = async (id: string): Promise<any> => {
  try {
    const response = await axiosConfig.get<any>(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log("Login failed:", error);
    throw error;
  }
};

export const updateUserInformationPlan = async ({
  id,
  password,
  email,
  fullname,
  age,
  gender,
  weight,
  height,
  activityFactor,
  nutritionPlan,
  dietType,
}: {
  id: string;
  password: string;
  email: string;
  fullname: string;
  age: number;
  gender: string;
  weight: string;
  height: string;
  activityFactor: string;
  nutritionPlan: string;
  dietType: string;
}): Promise<any> => {
  try {
    console.log("Request data:", {
      password,
      email,
      fullname,
      age,
      gender,
      weight,
      height,
      activityFactor,
      nutritionPlan,
      dietType,
    });
    const response = await axiosConfig.put<any>(`/user/${id}`, {
      password,
      email,
      fullname,
      age,
      gender,
      weight,
      height,
      activityFactor,
      nutritionPlan,
      dietType,
    });

    return response.data;
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
};
