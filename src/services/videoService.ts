import axiosInstance from "@/services/axiosInstance";
// import type { Video } from "@/types/video.types";

{
  /*
    router.get("/feed", videoCtrl.getFeed);
router.get("/feed/following", verifyToken, videoCtrl.getFollowingFeed);
router.post("/videos", verifyToken, videoCtrl.uploadVideo);
router.get("/videos/:id", videoCtrl.getVideo);
router.delete("/videos/:id", verifyToken, videoCtrl.deleteVideo);
router.post("/videos/:id/like", verifyToken, videoCtrl.toggleLike);
router.post("/videos/:id/save", verifyToken, videoCtrl.toggleSave);
    */
}
export const getFeed = async () => {
  const response = await axiosInstance.get("/feed");
  return response.data;
};
export const getFollowingFeed = async () => {
  const response = await axiosInstance.get("/feed/following");
  return response.data;
};
