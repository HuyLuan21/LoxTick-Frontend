import axiosInstance from "../axiosInstance";
import type { LoginResponse } from "../../types/user.type";

export const loginApi = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const logoutApi = async () => {
  await axiosInstance.post("/auth/logout");
};

export const registerApi = async (
  username: string,
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const forgotPasswordApi = async (email: string) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};
export const verifyOtpApi = async (otp: string) => {
  const response = await axiosInstance.post("/auth/verify-otp", { otp });
  return response.data;
};
export const resetPasswordApi = async (otp: string, password: string) => {
  const response = await axiosInstance.post("/auth/reset-password", {
    otp,
    password,
  });
  return response.data;
};
