import axiosInstance from "../axiosInstance";
import type { UserProfile, UpdateProfilePayload } from "@/types/user.type";

export const getUser = async (username: string): Promise<UserProfile> => {
  const usernameWithoutAt = username.replace("@", "");
  const response = await axiosInstance.get(`/users/${usernameWithoutAt}`);
  return response.data;
};

export const updateProfile = async (
  data: UpdateProfilePayload,
): Promise<{ message: string; user: UserProfile }> => {
  const response = await axiosInstance.put("/users/me", data);
  return response.data;
};

