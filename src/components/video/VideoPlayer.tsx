import { useRef, useState, useEffect, forwardRef } from "react";
import type { Video } from "@/types/video.types";

const VideoPlayer = forwardRef<HTMLVideoElement, { video: Video }>(
  ({ video }, ref) => {
    const internalRef = useRef<HTMLVideoElement>(null);
    const videoRef = (ref as React.RefObject<HTMLVideoElement>) || internalRef;
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const isLandscape = video.resolution_x > video.resolution_y;

    useEffect(() => {
      const el = videoRef.current;
      if (!el) return;
      el.currentTime = 0;
      el.play().catch(() => {});
      setIsPlaying(true);
    }, [video.id]);

    const handleTimeUpdate = () => {
      const el = videoRef.current;
      if (!el || !el.duration) return;
      setProgress((el.currentTime / el.duration) * 100);
    };

    const togglePlay = () => {
      const el = videoRef.current;
      if (!el) return;
      if (el.paused) {
        el.play();
        setIsPlaying(true);
      } else {
        el.pause();
        setIsPlaying(false);
      }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = videoRef.current;
      if (!el) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      el.currentTime = pct * el.duration;
    };

    const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      const el = videoRef.current;
      if (!el) return;
      el.muted = !el.muted;
      setIsMuted(el.muted);
    };

    return (
      <div
        className={`
          relative bg-black overflow-hidden cursor-pointer select-none rounded-xl
          ${isLandscape ? "w-full" : "h-full aspect-9/16"}
        `}
        onClick={togglePlay}
        style={
          isLandscape
            ? {
                aspectRatio: `${video.resolution_x}/${video.resolution_y}`,
                width: "100%",
                maxHeight: "80vh",
                margin: "auto",
              }
            : undefined
        }
      >
        <video
          ref={videoRef}
          src={video.video_url}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/40 rounded-full p-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        )}

        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 bg-black/40 rounded-full p-2 text-white z-10"
        >
          {isMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            handleSeek(e);
          }}
        >
          <div
            className="h-full bg-white transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
