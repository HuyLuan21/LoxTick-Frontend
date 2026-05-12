import type { CommentResponse } from "@/types/comment.type";
import axiosInstance from "./axiosInstance";

export const getComments = async ({
  videoId,
  parentId,
  limit,
  cursor,
}: {
  videoId: number;
  parentId?: number;
  limit: number;
  cursor?: string;
}): Promise<CommentResponse | undefined> => {
  try {
    const response = await axiosInstance.get(`/videos/${videoId}/comments`, {
      params: {
        parent_id: parentId,
        limit: limit,
        cursor: cursor,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

export const toggleCommentLike = async (
  commentId: number,
): Promise<{ liked: boolean } | undefined> => {
  try {
    const response = await axiosInstance.post(`/comments/${commentId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error toggling comment like:", error);
  }
};
