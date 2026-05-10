import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { DrawerDescription } from "../ui/drawer";
import { DrawerFooter } from "../ui/drawer";
import type { CommentModel, CommentResponse } from "@/types/comment.type";
import { getComments } from "@/services/commentService";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentItem from "./CommentItem";

const LIMIT_COMMENTS = 10;

export function VideoComments({
  open,
  onOpenChange,
  videoId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: number;
}) {
  const [comments, setComments] = useState<CommentResponse>();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments({ videoId, limit: LIMIT_COMMENTS });

        setComments(response);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <Drawer
      direction="right"
      modal={false}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Video</DrawerTitle>
          <DrawerDescription>Video details</DrawerDescription>
        </DrawerHeader>
        <div id="comment_scrollable" className="overflow-y-scroll flex-1">
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
              loader={<p>Loading older messages...</p>}
              inverse={true}
              scrollableTarget="comment_scrollable"
            >
              {comments?.comments.map((comment: CommentModel) => {
                return (
                  <React.Fragment key={comment.id}>
                    <CommentItem
                      comment={comment}
                      level={0}
                      setComments={setComments}
                    />
                  </React.Fragment>
                );
              })}
            </InfiniteScroll>
          )}
        </div>
        <DrawerFooter>
          <DrawerTitle>Video</DrawerTitle>
          <DrawerDescription>Video details</DrawerDescription>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
