import {
  forgotPasswordApi,
  loginApi,
  registerApi,
  resetPasswordApi,
  verifyOtpApi,
} from "./authApi";
import { saveToken, removeToken } from "./tokenService";
import type { User } from "../types/user.type";

export const login = async (email: string, password: string): Promise<User> => {
  const data = await loginApi(email, password);
  saveToken(data.token);
  return data.user;
};

export const logout = () => {
  removeToken();
};

export const register = async (
  username: string,
  email: string,
  password: string,
): Promise<User> => {
  const data = await registerApi(username, email, password);
  saveToken(data.token);
  return data.user;
};
export const forgotPassword = async (email: string) => {
  const data = await forgotPasswordApi(email);
  return data;
};
export const resetPassword = async (otp: string, password: string) => {
  const data = await resetPasswordApi(otp, password);
  return data;
};
export const verifyOtp = async (otp: string) => {
  const data = await verifyOtpApi(otp);
  return data;
};
