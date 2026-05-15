import { useEffect, useRef, useState, useCallback } from "react";
import VideoActions from "./VideoActions";
import VideoPlayer from "./VideoPlayer";
import type { Video } from "@/types/video.types";
import { VideoComments } from "./VideoComments";

export interface VideoFeedResponse {
  videos: Video[];
  nextCursor?: string | null;
  hasMore: boolean;
}

export default function VideoCard({
  isCommentOpen,
  setIsCommentOpen,
  fetchFn,
}: {
  isCommentOpen: boolean;
  setIsCommentOpen: (open: boolean) => void;
  fetchFn: (cursor?: string) => Promise<any>;
}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const isScrolling = useRef(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const THRESHOLD = 80;

  // ✅ Fetch
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetchFn();
        setVideos(response.videos || []);
        setHasMore(response.hasMore);
        setNextCursor(response.nextCursor ?? null);
      } catch (err) {
        console.error("Fetch video error:", err);
      } finally {
        setInitialLoad(false);
      }
    };
    fetchVideo();
  }, [fetchFn]);
  // LOAD MORE
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || !nextCursor) return;
    loadingRef.current = true;
    try {
      const response = await fetchFn(nextCursor);
      setVideos((prev) => [...prev, ...(response.videos || [])]);
      setNextCursor(response.nextCursor ?? null);
      setHasMore(response.hasMore);
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, nextCursor]);

  useEffect(() => {
    if (currentIndex >= videos.length - 5) {
      loadMore();
    }
  }, [currentIndex, videos.length]);
  // Wheel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current || videos.length === 0) return;

      e.preventDefault();
      isScrolling.current = true;

      setCurrentIndex((prev) =>
        e.deltaY > 0
          ? Math.min(prev + 1, videos.length - 1)
          : Math.max(prev - 1, 0),
      );

      setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };
    el.addEventListener("wheel", handleWheel);
    return () => el.removeEventListener("wheel", handleWheel);
  }, [videos.length]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (videos.length === 0) return;
      if (e.key === "ArrowDown")
        setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1));
      else if (e.key === "ArrowUp")
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [videos.length]);

  // Drag
  const handlePointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientY - startY.current;
    if (delta > 0 && currentIndex === 0) return;
    if (delta < 0 && currentIndex === videos.length - 1) return;
    setDragY(delta);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (dragY < -THRESHOLD && currentIndex < videos.length - 1)
      setCurrentIndex((i) => i + 1);
    else if (dragY > THRESHOLD && currentIndex > 0)
      setCurrentIndex((i) => i - 1);
    setDragY(0);
  };

  // Video peek khi đang kéo
  const peekIndex =
    dragY < 0 ? currentIndex + 1 : dragY > 0 ? currentIndex - 1 : null;

  // Cập nhật is_following cho tất cả video cùng tác giả
  const handleFollowToggle = (username: string, isFollowing: boolean) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.author.username === username
          ? { ...v, author: { ...v.author, is_following: isFollowing } }
          : v,
      ),
    );
  };
  const handleLikeToggle = (videoId: number, isLiked: boolean) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId
          ? {
              ...v,
              is_liked: isLiked,
              like_count: isLiked ? v.like_count + 1 : v.like_count - 1,
            }
          : v,
      ),
    );
  };
  const handleSaveClick = (videoId: number, isSaved: boolean) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId
          ? {
              ...v,
              is_saved: isSaved,
              save_count: isSaved ? v.save_count + 1 : v.save_count - 1,
            }
          : v,
      ),
    );
  };
  const handleCommentToggle = () => {
    if (isCommentOpen) {
      setIsCommentOpen(false);
    } else {
      setIsCommentOpen(true);
    }
  };

  const currentVideo = videos[currentIndex];
  const isLandscape = currentVideo?.resolution_x > currentVideo?.resolution_y;

  if (initialLoad) {
    return (
      <div className="flex items-center justify-center w-full h-dvh">
        <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-dvh text-white">
        <p className="text-gray-500 text-lg">Chưa có video nào để hiển thị.</p>
      </div>
    );
  }

  return (
    <div
      className={`relative flex justify-center h-dvh overflow-hidden gap-4 ${
        isLandscape ? "px-16 pr-44 items-center" : "pr-32"
      }`}
    >
      {currentVideo && (
        <VideoComments
          open={isCommentOpen}
          onOpenChange={setIsCommentOpen}
          videoId={currentVideo?.id}
          videoAuthorId={currentVideo?.author?.id}
        />
      )}

      {/* Stack video — độc lập, không bị ảnh hưởng bởi padding/gap */}
      <div
        ref={containerRef}
        className="relative overflow-hidden h-dvh"
        style={{ width: isLandscape ? "auto" : "fit-content" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          style={{
            transform: `translateY(calc(${-currentIndex * 100}dvh + ${dragY}px))`,
            transition: isDragging
              ? "none"
              : "transform 400ms cubic-bezier(0.25, 1, 0.5, 1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {videos.map((video, i) => (
            <div
              key={video.id}
              style={{ height: "100dvh", flexShrink: 0 }}
              className="flex items-center justify-center py-4"
            >
              {(i === currentIndex || i === peekIndex) && (
                <VideoPlayer video={video} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info & Actions — vẫn ở ngoài, căn theo viewport */}
      <div className="flex flex-col justify-end gap-4 py-4">
        {currentVideo && (
          <VideoActions
            video={currentVideo}
            onFollowToggle={handleFollowToggle}
            onLikeToggle={handleLikeToggle}
            onSaveClick={handleSaveClick}
            onShareClick={() => {}}
            onCommentClick={handleCommentToggle}
          />
        )}
      </div>
    </div>
  );
}
