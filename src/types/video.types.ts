// types/video.types.ts

import type { User } from "./user.type";

export type VideoStatus = "processing" | "active" | "banned";
export type VideoVisibility = "public" | "private" | "followers_only";

export interface Video {
  id: number;
  user_id: number;
  video_url: string;
  playback_url: string | null;
  public_id: string | null;
  thumbnail_url: string | null;
  caption: string | null;
  duration: number | null;
  resolution_x: number;
  resolution_y: number;
  created_at: string; // hoặc Date
  view_count: number;
  like_count: number;
  comment_count: number;
  save_count: number;
  repost_count: number;
  status: VideoStatus;
  visibility: VideoVisibility;
  published_at: string | null;
  allow_repost: boolean;
  allow_comment: boolean;
  author: Pick<User, "username" | "avatar_url" | "id">;
}

// Tạo video mới (bỏ các field tự sinh)
