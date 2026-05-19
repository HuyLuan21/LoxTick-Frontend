import { io } from "socket.io-client";

// Dùng URL backend từ biến môi trường, mặc định là http://localhost:3000 nếu không có
const URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "") // Bỏ /api nếu có để kết nối tới root của backend
  : "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: true, // Kết nối ngay khi load trang
});
