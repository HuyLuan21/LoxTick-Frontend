import type { User } from "./user.type";

interface CommentModel {
  id: number;
  video_id: number;
  user_id: number;
  parent_id: number | null;
  content: string;
  created_at: string;
  like_count: number;
  is_liked: boolean;
  author: Pick<User, "id" | "username" | "display_name" | "avatar_url">;
  replies_count: number;
  replies?: CommentModel[];
}

interface CommentResponse {
  comments: CommentModel[];
  next_cursor: string | null;
}

export type { CommentModel, CommentResponse };
