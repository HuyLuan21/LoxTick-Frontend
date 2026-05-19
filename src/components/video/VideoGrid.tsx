import { Link } from "react-router-dom";
import { Play } from "lucide-react";

import type { Video } from "@/types/video.types";

function VideoGrid({
  videos,
  type,
}: {
  videos: Video[];
  type: "user" | "repost" | "liked" | "saved";
}) {
  if (!videos.length) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Không có video
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {videos.map((video) => (
        <Link key={video.id} to={`/video/${video.id}`} className="group">
          <div className="relative aspect-9/16 overflow-hidden rounded-md bg-zinc-900">
            {video.thumbnail_url ? (
              <img
                src={video.thumbnail_url}
                alt={video.video_url}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No thumbnail
              </div>
            )}

            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />

            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-sm font-semibold">
              <Play className="h-4 w-4 fill-white" />

              <span>
                {Intl.NumberFormat("en", {
                  notation: "compact",
                }).format(video.view_count)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VideoGrid;
