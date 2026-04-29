import { useEffect } from "react";
import type { Video } from "@/types/video.types";
import { getFeed } from "@/services/videoService";
import FormatCount from "@/utils/formatCount";
import {
  HeartIcon,
  CommentIcon,
  BookMarkIcon,
  ShareIcon,
  FollowUserIcon,
} from "@/components/Icons/Icons";
import { UserAvatar } from "@/components/Avavtar/userAvatar";
import { cn } from "@/lib/utils";

//video,like,command,bookmark,share
function ActionsButtons({
  icon,
  count,
  onClick,
  className,
}: {
  icon: React.ReactNode;
  count?: number;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer text-center"
    >
      <div
        className={cn(
          `bg-[#f1f1f2] dark:bg-tiktok-dark-bg dark:hover:bg-tiktok-dark-hover mt-2 mx-0 mb-1.5 rounded-full size-12 flex justify-center items-center shadow-lg`,
          className,
        )}
      >
        {icon}
      </div>
      {count && <p className="text-semibold">{FormatCount({ count })}</p>}
    </div>
  );
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
    <div className="flex flex-col gap-2 justify-end">
      <ActionsButtons
        icon={
          <div className="flex relative mb-5">
            <UserAvatar
              className="size-12"
              userName={video.author.username}
              userAvatarUrl={video.author.avatar_url}
            />
            <div className="absolute size-6 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2  bg-tiktok-red flex justify-center items-center rounded-full border-2 border-white dark:border-tiktok-dark-bg">
              <FollowUserIcon className="size-3.5 text-white dark:text-white" />
            </div>
          </div>
        }
        onClick={() => {}}
      />
      <ActionsButtons
        icon={<HeartIcon className="size-6 flex justify-center items-center" />}
        count={100}
        onClick={() => {}}
      />
      <ActionsButtons
        icon={
          <CommentIcon className="size-6 flex justify-center items-center" />
        }
        count={100}
        onClick={() => {}}
      />
      <ActionsButtons
        icon={
          <BookMarkIcon className="size-6 flex justify-center items-center" />
        }
        count={100}
        onClick={() => {}}
      />
      <ActionsButtons
        icon={<ShareIcon className="size-6 flex justify-center items-center" />}
        count={100}
        onClick={() => {}}
      />
    </div>
  );
}
