import { getComments, toggleCommentLike } from "@/services/commentService";
import type { CommentModel, CommentResponse } from "@/types/comment.type";
import { useState } from "react";
import { UserAvatar } from "../Avavtar/userAvatar";
import { Flag, Heart } from "lucide-react";

interface CommentItemProps {
  comment: CommentModel;
  level: number; // level dùng để css thụt vào nếu là children
  setComments: React.Dispatch<
    React.SetStateAction<CommentResponse | undefined>
  >;
  videoAuthorId: number;
}

/**
 * Format ngày dạng dd-mm-yyyy
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const CommentItem = ({
  comment,
  level = 0,
  setComments,
  videoAuthorId,
}: CommentItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likeCount, setLikeCount] = useState(comment.like_count);

  const isAuthor = comment.author.id === videoAuthorId;

  const handleToggleLike = async () => {
    const result = await toggleCommentLike(comment.id);
    if (result) {
      setIsLiked(result.liked);
      setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1));
    }
  };

  const handleLoadMoreReplies = async () => {
    try {
      setIsLoading(true);

      const replies = await getComments({
        videoId: comment.video_id,
        parentId: comment.id,
        limit: 20,
      });

      if (replies) {
        setComments((prev) => {
          if (!prev) return prev;

          const addRepliesToComments = (
            comments: CommentModel[],
            replies: CommentResponse,
          ): CommentModel[] => {
            return comments.map((cmt: CommentModel): CommentModel => {
              if (cmt.id === comment.id) {
                return {
                  ...cmt,
                  replies: [
                    ...(cmt.replies ?? []),
                    ...(replies.comments ?? []),
                  ],
                };
              }

              if (cmt.replies) {
                return {
                  ...cmt,
                  replies: addRepliesToComments(cmt.replies, replies),
                };
              }

              return cmt;
            });
          };

          return {
            ...prev,
            comments: addRepliesToComments(prev.comments, replies),
          };
        });
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // comment 2 cấp
    <div
      style={{ marginLeft: level > 1 ? 20 : level * 20 }}
      className="group flex gap-2.5 py-2.5"
    >
      {/* Avatar */}
      <UserAvatar
        className="size-8 shrink-0"
        userName={comment.author.username}
        userAvatarUrl={comment.author.avatar_url}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Username + Author badge */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-foreground">
            {comment.author.display_name || comment.author.username}
          </span>
          {isAuthor && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary leading-none">
              Tác giả
            </span>
          )}
          {/* Report button — hiện khi hover */}
          <button
            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted cursor-pointer"
            title="Báo cáo bình luận"
          >
            <Flag className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>

        {/* Comment content */}
        <p className="text-sm text-foreground mt-0.5 word-break">
          {comment.content}
        </p>

        {/* Date + Reply + Like row */}
        <div className="flex items-center gap-3 mt-1">
          {/* Date */}
          <span className="text-[11px] text-muted-foreground">
            {formatDate(comment.created_at)}
          </span>
          {/* Reply button */}
          <button className="text-xs text-muted-foreground font-medium hover:text-foreground cursor-pointer transition-colors">
            Trả lời
          </button>
          {/* Like — pushed to right */}
          <button
            onClick={handleToggleLike}
            className="flex items-center gap-1 text-xs cursor-pointer group/like ml-auto"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground group-hover/like:text-red-400"
              }`}
            />
            <span
              className={`${isLiked ? "text-red-500" : "text-muted-foreground"}`}
            >
              {likeCount}
            </span>
          </button>
        </div>

        {/* Load more replies */}
        {comment.replies_count - (comment.replies?.length ?? 0) > 0 && (
          <span
            onClick={handleLoadMoreReplies}
            className="text-muted-foreground text-xs cursor-pointer hover:underline mt-1 inline-block"
          >
            {isLoading ? (
              "...đang tải"
            ) : (
              <>
                Xem thêm{" "}
                {comment.replies_count - (comment.replies?.length ?? 0)} trả lời
              </>
            )}
          </span>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-1">
            {comment.replies.map((reply) => {
              return (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  level={level + 1}
                  setComments={setComments}
                  videoAuthorId={videoAuthorId}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
