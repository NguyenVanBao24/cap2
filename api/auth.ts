// src/api/auth.ts
import axios from "axios";
interface LoginResponse {
  user: string;
  token: string;
}
// Hàm gọi API `login`
export const loginAPI = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    // const response = await axios.post("https://example.com/api/login", {
    //   username,
    //   password,
    // });
    const response = { data: { user: "a", token: "123" } };
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Hàm gọi API `logout` (nếu có)
export const logoutAPI = async () => {
  try {
    // await axios.post("https://example.com/api/logout");
    const response = { data: { status: "ok" } };
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
