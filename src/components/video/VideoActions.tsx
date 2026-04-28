import { useEffect } from "react";
import type { Video } from "@/types/video.types";
import { getFeed } from "@/services/videoService";

//video,like,command,bookmark,share
function ActionsButtons({
  icon,
  count,
  onClick,
}: {
  icon: React.ReactNode;
  count: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-1 cursor-pointer text-center"
    >
      {icon}
      <p className="text-sm">{FormatCount({ count })}</p>
    </div>
  );
}
function FormatCount({ count }: { count: number }) {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count;
}
export default function VideoActions({ video }: { video: Video }) {
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getFeed();
        console.log(response.videos);
      } catch (err) {
        console.error("Fetch video error:", err);
      }
    };
    fetchVideo();
  }, []);
  return (
    <div>
      <ActionsButtons
        icon="/icons/heart.svg"
        count={video.like_count}
        onClick={() => {}}
      />
      <ActionsButtons icon="" count={video.comment_count} onClick={() => {}} />
      <ActionsButtons icon="" count={video.save_count} onClick={() => {}} />
      <ActionsButtons icon="" count={video.repost_count} onClick={() => {}} />
    </div>
  );
}
