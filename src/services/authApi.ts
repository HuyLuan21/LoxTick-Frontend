import axiosInstance from "./axiosInstance";
import type { LoginResponse } from "../types/user.type";

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
