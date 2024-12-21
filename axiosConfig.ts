import axios from "axios";
import { getToken, getRefreshToken, setTokens } from "@/store/tokenHelper";
import { useAuthStore } from "@/store/authStore";

const BASE_URL = "https://f41c-2405-4802-a0b7-dfb0-d1c2-8b6-81d3-3fe8.ngrok-free.app";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAuthToken = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      const response = await axiosInstance.post("/auth/refresh", { refreshToken });
      const { token, refreshToken: newRefreshToken } = response.data;
      setTokens(token, newRefreshToken);
    } catch (error) {
      console.log("Failed to refresh token:", error);
      useAuthStore.getState().logout(); // Đăng xuất nếu không thể refresh
    }
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu error.response tồn tại
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshAuthToken();
        return axiosInstance(originalRequest);
      }

      console.log("API Error:", error.response.data);
      return Promise.reject(error.response.data); // Trả về lỗi cho phía client
    }

    console.log("Network Error:", error.message);
    return Promise.reject(error); // Trả về lỗi cho phía client
  }
);

export default axiosInstance;
