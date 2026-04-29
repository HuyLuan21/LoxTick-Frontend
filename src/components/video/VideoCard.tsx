import VideoPlayer from "./VideoPlayer";
import VideoInfo from "./VideoInfo";
// import VideoActions from "./VideoActions";
import { getFeed } from "@/services/videoService";
import { useEffect, useState, useRef } from "react";
import type { Video } from "@/types/video.types";
import VideoActions from "./VideoActions";

export default function VideoCard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);

  // 🔥 Fetch video
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

  // 🔥 Scroll (wheel)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current || videos.length === 0) return;

      isScrolling.current = true;

      setCurrentIndex((prev) => {
        if (e.deltaY > 0) {
          return Math.min(prev + 1, videos.length - 1);
        } else {
          return Math.max(prev - 1, 0);
        }
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 700);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [videos.length]);

  // 🔥 Keyboard (Arrow Up / Down)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (videos.length === 0) return;

      if (e.key === "ArrowDown") {
        setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1));
      } else if (e.key === "ArrowUp") {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [videos.length]);

  const currentVideo = videos[currentIndex];
  const isLandscape = currentVideo?.resolution_x > currentVideo?.resolution_y;
  console.log(isLandscape, currentVideo);
  return (
    <div
      className={`flex justify-center h-dvh py-4 px-4 gap-4 ${isLandscape ? "px-16 pr-44 items-center" : "pr-32"}`}
    >
      {/* Video */}
      {currentVideo && <VideoPlayer video={currentVideo} />}

      {/* Info */}
      <VideoInfo />

      {/* Actions */}
      {currentVideo && <VideoActions video={currentVideo} />}
    </div>
  );
}
