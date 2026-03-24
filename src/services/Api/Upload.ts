const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const PRESET = import.meta.env.VITE_UPLOAD;

async function uploadToCloudinary(file: File) {
  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";
  const folder = isVideo ? "tiktok_clone/video" : "tiktok_clone/image";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PRESET);
  formData.append("folder", folder);

  if (isVideo) {
    formData.append("eager", "q_auto:best,vc_auto,w_720,h_1280,c_limit");
    formData.append("eager_async", "true");
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) throw new Error(`Upload failed: ${response.status}`);

  return response.json();
}

export { uploadToCloudinary };