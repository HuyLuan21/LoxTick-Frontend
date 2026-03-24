import { getUser, updateProfile } from "./Api/userApi";
import { uploadToCloudinary } from "./Api/Upload";

export const userServices = {
  getUser,
  uploadToCloudinary,
  updateProfile,
};
