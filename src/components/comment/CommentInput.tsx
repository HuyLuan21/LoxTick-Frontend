import { UserAvatar } from "../Avavtar/userAvatar";
import { MentionIcon, ReactionIcon } from "../Icons/Icons";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { addComment } from "@/services/commentService";
import type { CommentModel, CommentResponse } from "@/types/comment.type";

const CommentInput = ({
  userAvatarUrl,
  userName,
  videoId,
  setComments,
  parentId,
  onSuccess,
  className = "border-t border-border px-4 py-3",
}: {
  userAvatarUrl: string;
  userName: string;
  videoId: number;
  setComments: React.Dispatch<React.SetStateAction<CommentResponse | undefined>>;
  parentId?: number;
  onSuccess?: () => void;
  className?: string;
}) => {
  const [content, setContent] = useState("");
  const enableSend = content.trim().length > 0;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    if (!enableSend || isSubmitting) return;
    try {
      setIsSubmitting(true);
      const response = await addComment({ videoId, parentId, content });
      if (response && response.comment) {
        setComments((prev) => {
          if (!prev) {
            return { comments: [response.comment], next_cursor: null };
          }
          if (!parentId) {
            return {
              ...prev,
              comments: [response.comment, ...prev.comments],
            };
          }
          
          const addReply = (
            comments: CommentModel[],
            targetId: number,
            newReply: CommentModel
          ): CommentModel[] => {
            return comments.map((c) => {
              if (c.id === targetId) {
                return { ...c, replies: [newReply, ...(c.replies || [])] };
              }
              if (c.replies) {
                return { ...c, replies: addReply(c.replies, targetId, newReply) };
              }
              return c;
            });
          };

          return {
            ...prev,
            comments: addReply(prev.comments, parentId, response.comment),
          };
        });
        setContent(""); // Clear input on success
        onSuccess?.();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <UserAvatar
          className="size-8"
          userName={userName}
          userAvatarUrl={userAvatarUrl}
        />
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Thêm bình luận..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-muted rounded-full px-4 pr-10 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <div className="absolute right-2 inset-y-0 flex items-center gap-2">
            <MentionIcon className="size-7 cursor-pointer hover:text-foreground transition-colors" />
            <ReactionIcon className="size-7 cursor-pointer hover:text-foreground transition-colors" />
          </div>
        </div>
        <Button
          className="size-7 bg-tiktok-red rounded-full flex items-center justify-center p-0"
          onClick={handleSend}
          disabled={!enableSend || isSubmitting}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
export default CommentInput;
