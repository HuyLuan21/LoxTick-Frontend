import React, { useEffect, useState, useRef } from "react";
import type { CommentModel, CommentResponse } from "@/types/comment.type";
import { getComments } from "@/services/commentService";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentItem from "./CommentItem";
import { X } from "lucide-react";
import { UserAvatar } from "../Avavtar/userAvatar";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/selector";

const LIMIT_COMMENTS = 10;

export function VideoComments({
  open,
  onOpenChange,
  videoId,
  videoAuthorId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: number;
  videoAuthorId: number;
}) {
  const [comments, setComments] = useState<CommentResponse>();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const fetchComments = async () => {
      try {
        const response = await getComments({ videoId, limit: LIMIT_COMMENTS });
        setComments(response);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [open, videoId]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div
      ref={panelRef}
      className={`
        fixed top-0 right-0 z-50 h-full w-100 max-w-full
        bg-background border-l border-border
        flex flex-col
        shadow-2xl
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 ">
        <h2 className="text-base font-semibold">
          Bình luận{" "}
          {comments?.comments?.length !== undefined && (
            <span className="text-muted-foreground font-normal text-sm">
              ({comments.comments.length})
            </span>
          )}
        </h2>
        <button
          onClick={() => onOpenChange(false)}
          className="p-1.5 rounded-full bg-muted  hover:bg-[#e0e0e0] transition-colors cursor-pointer  "
          aria-label="Close comments"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Comments list */}
      <div id="comment_scrollable" className="overflow-y-auto flex-1 px-4 py-3">
        {comments && (
          <InfiniteScroll
            dataLength={comments?.comments.length || 0}
            next={async () => {
              try {
                const response = await getComments({
                  videoId,
                  limit: LIMIT_COMMENTS,
                  cursor: comments.next_cursor!,
                });

                if (response) {
                  setComments((prev) => {
                    if (!prev) return response;

                    return {
                      ...prev,
                      comments: [...prev.comments, ...response.comments],
                      next_cursor: response.next_cursor,
                    };
                  });
                }
              } catch (error) {
                console.error("Error fetching comments:", error);
              }
            }}
            hasMore={!!comments?.next_cursor || false}
            loader={
              <p className="text-center text-sm text-muted-foreground py-2">
                Đang tải thêm...
              </p>
            }
            scrollableTarget="comment_scrollable"
          >
            {comments?.comments.map((comment: CommentModel) => {
              return (
                <React.Fragment key={comment.id}>
                  <CommentItem
                    comment={comment}
                    level={0}
                    setComments={setComments}
                    videoAuthorId={videoAuthorId}
                  />
                </React.Fragment>
              );
            })}
          </InfiniteScroll>
        )}
      </div>

      {/* Footer — comment input placeholder */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <UserAvatar
            className="size-8"
            userName={currentUser?.username || ""}
            userAvatarUrl={currentUser?.avatar_url || ""}
          />
          <input
            type="text"
            placeholder="Thêm bình luận..."
            className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
