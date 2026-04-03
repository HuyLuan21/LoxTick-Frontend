// types/video.types.ts

export type VideoStatus = "processing" | "active" | "banned";
export type VideoVisibility = "public" | "private" | "followers_only";

export interface Video {
  id: number;
  user_id: number;
  video_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  duration: number | null;
  created_at: string; // hoặc Date
  view_count: number;
  like_count: number;
  comment_count: number;
  save_count: number;
  repost_count: number;
  status: VideoStatus;
  visibility: VideoVisibility;
}

// Tạo video mới (bỏ các field tự sinh)
