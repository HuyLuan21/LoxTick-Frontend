import axiosInstance from "@/services/axiosInstance";

export const getFeed = async (cursor?: string) => {
  const response = await axiosInstance.get("/feed", { params: { cursor } });
  return response.data;
};
export const getFollowingFeed = async () => {
  const response = await axiosInstance.get("/feed/following");
  return response.data;
};
export const getFriendVideos = async () => {
  const response = await axiosInstance.get("/feed/friends");
  return response.data;
};
