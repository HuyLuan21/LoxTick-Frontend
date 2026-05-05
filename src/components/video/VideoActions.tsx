import type { Video } from "@/types/video.types";
import FormatCount from "@/utils/formatCount";
import {
  HeartIcon,
  CommentIcon,
  BookMarkIcon,
  ShareIcon,
  FollowUserIcon,
  UnFollowUserIcon,
} from "@/components/Icons/Icons";
import { UserAvatar } from "@/components/Avavtar/userAvatar";
import { cn } from "@/lib/utils";
import { togleFollow } from "@/services/userServices";

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
          `bg-[#f1f1f2] dark:bg-tiktok-dark-bg dark:hover:bg-tiktok-dark-hover mt-2 mx-0 mb-1.5 rounded-full size-12 flex justify-center items-center`,
          className,
        )}
      >
        {icon}
      </div>
      {count && <p className="text-semibold">{FormatCount({ count })}</p>}
    </div>
  );
}

export default function VideoActions({
  video,
  onFollowToggle,
}: {
  video: Video;
  onFollowToggle: (username: string, isFollowing: boolean) => void;
}) {
  const handleToggleFollow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFollowState = !video.author.is_following;
    // Optimistic update: cập nhật tất cả video cùng tác giả ngay lập tức
    onFollowToggle(video.author.username, newFollowState);
    try {
      await togleFollow(video.author.username);
    } catch (err) {
      // Rollback nếu API lỗi
      onFollowToggle(video.author.username, !newFollowState);
      console.error("Toggle follow error:", err);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-end">
      <ActionsButtons
        className="bg-transparent dark:transparent"
        icon={
          <div className="flex relative mb-5">
            <UserAvatar
              className="size-12"
              userName={video.author.username}
              userAvatarUrl={video.author.avatar_url}
            />
            <div className="absolute size-6 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2  bg-tiktok-red flex justify-center items-center rounded-full border-2 border-white dark:border-tiktok-dark-bg">
              {video.author.is_following ? (
                <UnFollowUserIcon
                  className="size-3.5 text-white dark:text-white"
                  onClick={handleToggleFollow}
                />
              ) : (
                <FollowUserIcon
                  className="size-3.5 text-white dark:text-white"
                  onClick={handleToggleFollow}
                />
              )}
            </div>
          </div>
        }
        onClick={() => {
          window.location.href = `/user/${video.author.username}`;
        }}
      />
      <ActionsButtons
        icon={<HeartIcon className="size-6 flex justify-center items-center" />}
        count={video.like_count}
        onClick={() => {}}
      />
      <ActionsButtons
        icon={
          <CommentIcon className="size-6 flex justify-center items-center" />
        }
        count={video.comment_count}
        onClick={() => {}}
      />
      <ActionsButtons
        icon={
          <BookMarkIcon className="size-6 flex justify-center items-center" />
        }
        count={video.save_count}
        onClick={() => {}}
      />
      <ActionsButtons
        icon={<ShareIcon className="size-6 flex justify-center items-center" />}
        count={video.repost_count}
        onClick={() => {}}
      />
    </div>
  );
}
