import axios from "axios";
import { getToken } from "./tokenService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // ← URL backend
  timeout: 10000, // ← timeout 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request Interceptor ──────────────────────────────
// Tự động gắn token vào mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor ─────────────────────────────
// Tự động xử lý lỗi chung
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn → tự động đăng xuất
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
