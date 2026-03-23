import axiosInstance from "../axiosInstance";

export const getUser = async (username: string) => {
  const usernameWithoutAt = username.replace("@", "");
  const response = await axiosInstance.get(`/users/${usernameWithoutAt}`);
  return response.data;
};
