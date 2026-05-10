import type { User } from "./user.type";

interface CommentModel {
  id: number;
  video_id: number;
  user_id: number;
  parent_id: number | null;
  content: string;
  created_at: string;
  author: Pick<User, "id" | "username" | "avatar_url">;
  replies_count: number;
  replies?: CommentModel[];
}

interface CommentResponse {
  comments: CommentModel[];
  next_cursor: string | null;
}

export type { CommentModel, CommentResponse };
