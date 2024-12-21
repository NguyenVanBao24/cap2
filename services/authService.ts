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
    console.log("Login failed at authServices:", error);
  }
};
export const signupService = async (
  username: string,
  email: string,
  password: string,
  fullname: string
): Promise<SignUpResponse> => {
  console.log(
    "first",
    "username",
    username,
    "email",
    email,
    "password",
    password,
    "fullname",
    fullname
  );
  try {
    const response = await axiosConfig.post<SignUpResponse>("/user", {
      username: username,
      email: email,
      password: password,
      fullname: fullname,
    });
    console.log(response, "at sign up");
    return response.data;
  } catch (error) {
    console.log("Sign up failed at authServices:", error);
  }
};

export const getUserInformationPlan = async (id: string): Promise<any> => {
  try {
    const response = await axiosConfig.get<any>(`/user/${id}`);

    return response.data;
  } catch (error) {
    console.log("get User Information Plan failed at authServices:", error);
  }
};

// export enum SignUpResponse {
//   NAME = "name",

// }

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
      id,
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
    console.log("update User Information Plan failed at authServices:", error);
  }
};
