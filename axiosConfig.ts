import axios from "axios";
import { getToken, getRefreshToken, setTokens } from "@/store/tokenHelper";
import { useAuthStore } from "@/store/authStore";

const BASE_URL = "https://2342-2405-4802-701b-e2d0-c13a-bd67-2fd-8435.ngrok-free.app";

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
      setTokens(token, newRefreshToken); // Cập nhật token
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

      // Nếu có một lỗi khác từ server, bạn có thể log ra hoặc xử lý tùy ý
      console.log("API Error:", error.response.data);
      return Promise.reject(error.response.data); // Trả về lỗi cho phía client
    }

    // Xử lý lỗi khi không có phản hồi từ server (ví dụ: lỗi mạng)
    console.log("Network Error:", error.message);
    return Promise.reject(error); // Trả về lỗi cho phía client
  }
);

export default axiosInstance;
