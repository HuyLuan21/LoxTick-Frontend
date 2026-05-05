import { useEffect, useRef, useState } from "react";
import VideoActions from "./VideoActions";
import VideoInfo from "./VideoInfo";
import VideoPlayer from "./VideoPlayer";
import type { Video } from "@/types/video.types";
import { getFeed } from "@/services/videoService";

export default function VideoCard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const THRESHOLD = 80;

  // ✅ Fetch
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getFeed();
        setVideos(response.videos || []);
      } catch (err) {
        console.error("Fetch video error:", err);
      }
    };
    fetchVideo();
  }, []);

  // ✅ Wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current || videos.length === 0) return;
      isScrolling.current = true;
      setCurrentIndex((prev) => {
        if (e.deltaY > 0) return Math.min(prev + 1, videos.length - 1);
        else return Math.max(prev - 1, 0);
      });
      setTimeout(() => {
        isScrolling.current = false;
      }, 700);
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [videos.length]);

  // ✅ Keyboard
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

  // ✅ Drag
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

  const currentVideo = videos[currentIndex];
  const isLandscape = currentVideo?.resolution_x > currentVideo?.resolution_y;

  return (
    <div
      className={`relative flex justify-center h-dvh overflow-hidden gap-4 ${
        isLandscape ? "px-16 pr-44 items-center" : "pr-32"
      }`}
    >
      {/* Stack video — độc lập, không bị ảnh hưởng bởi padding/gap */}
      <div
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
        <VideoInfo />
        {currentVideo && <VideoActions video={currentVideo} onFollowToggle={handleFollowToggle} />}
      </div>
    </div>
  );
}
