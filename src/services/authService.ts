// ==========================
// 📦 IMPORTS
// ==========================
import axiosInstance from "@/services/axiosInstance";
import { saveToken, removeToken } from "./tokenService";
import type { LoginResponse, User } from "@/types/user.type";

// ==========================
// 📦 API LAYER (chỉ call backend)
// ==========================

// 🔐 Login API
const loginApi = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

// 📝 Register API
const registerApi = async (
  username: string,
  email: string,
  otp: string,
  password: string,
) => {
  const response = await axiosInstance.post("/auth/register", {
    username,
    email,
    otp,
    password,
  });
  return response.data;
};

// 👤 Get current user
const getCurrentUserApi = async (): Promise<User> => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

// 🚪 Logout API
const logoutApi = async () => {
  await axiosInstance.post("/auth/logout");
};

// 🔁 Forgot password
const forgotPasswordApi = async (email: string) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

// 🔑 Verify OTP
const verifyOtpApi = async (otp: string) => {
  const response = await axiosInstance.post("/auth/verify-otp", { otp });
  return response.data;
};

// 🔒 Reset password
const resetPasswordApi = async (email: string, otp: string, password: string) => {
  const response = await axiosInstance.post("/auth/reset-password", {
    email,
    otp,
    password,
  });
  return response.data;
};

// ==========================
// 📦 SERVICE LAYER (business logic)
// ==========================

// 🔐 Login
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const data = await loginApi(email, password);

    // 💾 Lưu token vào localStorage / cookie
    saveToken(data.token);

    return data.user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// 📝 Register
export const register = async (
  username: string,
  email: string,
  otp: string,
  password: string,
) => {
  try {
    return await registerApi(username, email, otp, password);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Register failed");
  }
};

// 📧 Request Register OTP
export const requestRegisterOtp = async (email: string) => {
  try {
    const response = await axiosInstance.post("/auth/request-register-otp", { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Request OTP failed");
  }
};

// 👤 Get current user
export const getCurrentUser = async (): Promise<User> => {
  try {
    return await getCurrentUserApi();
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Fetch user failed");
  }
};

// 🚪 Logout
export const logout = async () => {
  try {
    // gọi backend (nếu có session / refresh token)
    await logoutApi();
  } finally {
    // luôn xoá token dù API có lỗi
    removeToken();
  }
};

// 🔁 Forgot password
export const forgotPassword = async (email: string) => {
  try {
    return await forgotPasswordApi(email);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Request failed");
  }
};

// 🔑 Verify OTP
export const verifyOtp = async (otp: string) => {
  try {
    return await verifyOtpApi(otp);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "OTP invalid");
  }
};

// 🔒 Reset password
export const resetPassword = async (email: string, otp: string, password: string) => {
  try {
    return await resetPasswordApi(email, otp, password);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Reset failed");
  }
};
