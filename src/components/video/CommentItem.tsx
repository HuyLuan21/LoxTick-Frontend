import { getComments } from "@/services/commentService";
import type { CommentModel, CommentResponse } from "@/types/comment.type";
import { useState } from "react";

interface CommentItemProps {
  comment: CommentModel;
  level: number; // level dùng để css thụt vào nếu là children
  setComments: React.Dispatch<
    React.SetStateAction<CommentResponse | undefined>
  >;
}

const CommentItem = ({ comment, level = 0, setComments }: CommentItemProps) => {
  const [isLoading, setIsLoading] = useState(false);

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
    <div style={{ marginLeft: level > 1 ? 0 : level * 20 }}>
      <h1>{comment.content}</h1>

      {comment.replies_count - (comment.replies?.length ?? 0) > 0 && (
        <span
          onClick={handleLoadMoreReplies}
          className="text-muted-foreground text-sm"
        >
          {isLoading ? (
            <p>...đang tải</p>
          ) : (
            <p>
              Xem thêm {comment.replies_count - (comment.replies?.length ?? 0)}{" "}
              trả lời
            </p>
          )}
        </span>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <>
          {comment.replies.map((reply) => {
            return (
              <CommentItem
                key={reply.id}
                comment={reply}
                level={level + 1}
                setComments={setComments}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default CommentItem;
