import { getToken } from "../tokenService";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const API_URL = import.meta.env.VITE_API_URL;

const getVideoSignature = async () => {
  const response = await fetch(`${API_URL}/cloudinary/signature/video`);
  return response.json();
};

const getImageSignature = async () => {
  const response = await fetch(`${API_URL}/cloudinary/signature/image`);
  return response.json();
};

async function uploadToCloudinary(file: File) {
  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";
  const folder = isVideo ? "tiktok_clone/video" : "tiktok_clone/image";

  const { signature, timestamp, api_key } = isVideo
    ? await getVideoSignature()
    : await getImageSignature();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("folder", folder);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());

  if (isVideo) {
    formData.append("eager", "q_auto:best,vc_auto,w_720,h_1280,c_limit");
    formData.append("eager_async", "true");
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) throw new Error(`Upload failed: ${response.status}`);

  const data = await response.json();
  return {
    //url is for image, video_url is for video
    url: data.secure_url,
    video_url: data.secure_url,
    playback_url: data.playback_url,
    public_id: data.public_id,
    duration: data.duration,
    resolution_x: data.width,
    resolution_y: data.height,
  };
}

//upload video to database
const uploadVideo = async (videoData: any) => {
  const response = await fetch(`${API_URL}/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(videoData),
  });
  return response.json();
};
export { uploadToCloudinary, uploadVideo };
