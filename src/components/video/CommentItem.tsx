import {
  getComments,
  toggleCommentLike,
  deleteComment,
} from "@/services/commentService";
import type { CommentModel, CommentResponse } from "@/types/comment.type";
import { useState } from "react";
import { UserAvatar } from "../Avavtar/userAvatar";
import { Heart } from "lucide-react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/selector";
import { MoreIcon } from "../Icons/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommentInput from "../comment/CommentInput";

interface CommentItemProps {
  comment: CommentModel;
  level: number; // level dùng để css thụt vào nếu là children
  setComments: React.Dispatch<
    React.SetStateAction<CommentResponse | undefined>
  >;
  videoAuthorId: number;
  replyToUsername?: string; // username của người được reply (dùng khi flatten level 3+)
  activeReplyId: number | null;
  setActiveReplyId: (id: number | null) => void;
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

/**
 * Flatten reply tree thành danh sách phẳng.
 * Dùng ở level 1 để gom tất cả replies con/cháu thành siblings cùng cấp (level 2).
 * - Direct replies (con trực tiếp): không có @username
 * - Nested replies (cháu trở đi): có @username của parent
 */
const flattenReplies = (
  replies: CommentModel[],
  parentAuthorName?: string,
): Array<{ comment: CommentModel; replyToUsername?: string }> => {
  const result: Array<{ comment: CommentModel; replyToUsername?: string }> = [];
  for (const reply of replies) {
    result.push({ comment: reply, replyToUsername: parentAuthorName });
    if (reply.replies && reply.replies.length > 0) {
      const authorName = reply.author.display_name || reply.author.username;
      result.push(...flattenReplies(reply.replies, authorName));
    }
  }
  return result;
};

/**
 * Đếm tổng số replies chưa load trong cây comment (đệ quy).
 * Dùng để hiển thị "Xem thêm X trả lời" ở level 1.
 */
const countUnloadedReplies = (comment: CommentModel): number => {
  let count = comment.replies_count - (comment.replies?.length ?? 0);
  if (comment.replies) {
    for (const reply of comment.replies) {
      count += countUnloadedReplies(reply);
    }
  }
  return count;
};

const CommentItem = ({
  comment,
  level = 0,
  setComments,
  videoAuthorId,
  replyToUsername,
  activeReplyId,
  setActiveReplyId,
}: CommentItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likeCount, setLikeCount] = useState(comment.like_count);
  const { requireAuth } = useRequireAuth();
  const currentUser = useAppSelector(selectCurrentUser);

  const isMyComment = currentUser?.id === comment.author.id;
  const isMyVideo = currentUser?.id === videoAuthorId;
  const isAuthor = comment.author.id === videoAuthorId;

  const isReplying = activeReplyId === comment.id;

  const handleToggleLike = () => {
    requireAuth(async () => {
      const result = await toggleCommentLike(comment.id);
      if (result) {
        setIsLiked(result.liked);
        setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1));
      }
    });
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

  const handleDeleteComment = () => {
    requireAuth(async () => {
      try {
        await deleteComment(comment.id);
        setComments((prev) => {
          if (!prev) return prev;
          const removeComment = (
            comments: CommentModel[],
            targetId: number,
          ): CommentModel[] => {
            return comments
              .filter((c) => c.id !== targetId)
              .map((c) => ({
                ...c,
                replies: c.replies
                  ? removeComment(c.replies, targetId)
                  : undefined,
              }));
          };
          return {
            ...prev,
            comments: removeComment(prev.comments, comment.id),
          };
        });
      } catch (error) {
        console.error("Lỗi khi xóa comment:", error);
      }
    });
  };

  return (
    // comment tối đa 3 cấp (level 0, 1, 2). Level 3+ flatten về level 2.
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
          {/* Action button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted cursor-pointer"
                title="Thêm"
              >
                <MoreIcon className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(isMyComment || isMyVideo) && (
                <DropdownMenuItem
                  className="text-red-500 hover:text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer font-medium"
                  onClick={handleDeleteComment}
                >
                  Xóa
                </DropdownMenuItem>
              )}
              {!isMyComment && (
                <DropdownMenuItem
                  onClick={() =>
                    requireAuth(() => {
                      /* report logic */
                    })
                  }
                  className="cursor-pointer font-medium"
                >
                  Báo cáo
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Comment content */}
        <p className="text-sm text-foreground mt-0.5 word-break">
          {replyToUsername && (
            <span className="text-primary font-semibold mr-1">
              @{replyToUsername}
            </span>
          )}
          {comment.content}
        </p>

        {/* Date + Reply + Like row */}
        <div className="flex items-center gap-3 mt-1">
          {/* Date */}
          <span className="text-[11px] text-muted-foreground">
            {formatDate(comment.created_at)}
          </span>
          {/* Reply button */}
          <button
            className="text-xs text-muted-foreground font-medium hover:text-foreground cursor-pointer transition-colors"
            onClick={() =>
              requireAuth(() => {
                setActiveReplyId(isReplying ? null : comment.id);
              })
            }
          >
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

        {/* Inline Reply Input */}
        {isReplying && (
          <div className={`mt-2 ${level < 2 ? "ml-5" : "-ml-10.5"}`}>
            <CommentInput
              userAvatarUrl={currentUser?.avatar_url || ""}
              userName={currentUser?.username || ""}
              videoId={comment.video_id}
              setComments={setComments}
              parentId={comment.id}
              onSuccess={() => setActiveReplyId(null)}
              className=""
            />
          </div>
        )}

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
        {level === 0 && comment.replies && comment.replies.length > 0 && (
          <div className="mt-1">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                level={1}
                setComments={setComments}
                videoAuthorId={videoAuthorId}
                activeReplyId={activeReplyId}
                setActiveReplyId={setActiveReplyId}
              />
            ))}
          </div>
        )}

        {/*
         * Level 1: flatten tất cả replies con/cháu thành danh sách phẳng ở level 2.
         * Replies trực tiếp: không có @username
         * Replies sâu hơn (cháu): có @username của parent
         */}
        {level === 1 && comment.replies && comment.replies.length > 0 && (
          <div className="mt-1">
            {flattenReplies(comment.replies).map(
              ({ comment: reply, replyToUsername: rtu }) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  level={2}
                  setComments={setComments}
                  videoAuthorId={videoAuthorId}
                  replyToUsername={rtu}
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                />
              ),
            )}
          </div>
        )}

        {/* Level 2+: không render replies (parent level 1 đã flatten và render rồi) */}
      </div>
    </div>
  );
};

export default CommentItem;
