import { uploadToCloudinary } from "./Api/Upload";
import axiosInstance from "./axiosInstance";

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
export const getFollowingList = async (
  userId: number,
  limit?: number,
  after?: string,
): Promise<{
  data: UserProfile[];
  next_cursor: string | null;
  has_more: boolean;
}> => {
  const params: Record<string, string | number> = {};
  if (limit) params.limit = limit;
  if (after) params.after = after;

  const response = await axiosInstance.get(`/users/${userId}/following`, {
    params,
  });
  return response.data;
};
// router.post("/users/:username/follow", verifyToken, userCtrl.toggleFollow);
export const togleFollow = async (username: string) => {
  const response = await axiosInstance.post(`/users/${username}/follow`);
  return response.data;
};
// router.get("/feed", videoCtrl.getFeed);
// router.get("/feed/following", verifyToken, videoCtrl.getFollowingFeed);
// router.post("/videos", verifyToken, videoCtrl.uploadVideo);
// router.get("/videos/:id", videoCtrl.getVideo);
// router.delete("/videos/:id", verifyToken, videoCtrl.deleteVideo);
// router.post("/videos/:id/like", verifyToken, videoCtrl.toggleLike);
// router.post("/videos/:id/save", verifyToken, videoCtrl.toggleSave);
export const toggleLike = async (videoId: number) => {
  const response = await axiosInstance.post(`/videos/${videoId}/like`);
  return response.data;
};
export const toggleSave = async (videoId: number) => {
  const response = await axiosInstance.post(`/videos/${videoId}/save`);
  return response.data;
};
export const share = async (videoId: number) => {
  const response = await axiosInstance.get(`/videos/${videoId}`);
  return response.data;
};
export const userServices = {
  getUser,
  uploadToCloudinary,
  updateProfile,
  getFollowingList,
  togleFollow,
  toggleLike,
  toggleSave,
  share,
};
