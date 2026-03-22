import { loginApi, registerApi } from "./authApi";
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
