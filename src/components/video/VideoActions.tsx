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
import {
  togleFollow,
  toggleLike,
  toggleSave,
  share,
} from "@/services/userServices";

//video,like,command,bookmark,share
function ActionsButtons({
  icon,
  count,
  onClick,
  className,
}: {
  icon: React.ReactNode;
  count?: number;
  onClick?: () => void;
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
  onLikeToggle,
  onSaveClick,
  onShareClick,
}: {
  video: Video;
  onFollowToggle: (username: string, isFollowing: boolean) => void;
  onLikeToggle: (videoId: number, isLiked: boolean) => void;
  onSaveClick: (videoId: number, isSaved: boolean) => void;
  onShareClick: (videoId: number) => void;
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
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikeState = !video.is_liked;
    onLikeToggle(video.id, newLikeState);
    try {
      await toggleLike(video.id);
    } catch (err) {
      // Rollback nếu API lỗi
      onLikeToggle(video.id, !newLikeState);
      console.error("Toggle like error:", err);
    }
  };
  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaveState = !video.is_saved;
    onSaveClick(video.id, newSaveState);
    try {
      await toggleSave(video.id);
    } catch (err) {
      // Rollback nếu API lỗi
      onSaveClick(video.id, !newSaveState);
      console.error("Toggle save error:", err);
    }
  };
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onShareClick(video.id);
    try {
      await share(video.id);
    } catch (err) {
      // Rollback nếu API lỗi
      onShareClick(video.id);
      console.error("Toggle share error:", err);
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
        icon={
          video.is_liked ? (
            <HeartIcon
              onClick={handleLike}
              className="size-6 fill-tiktok-red flex justify-center items-center"
            />
          ) : (
            <HeartIcon
              onClick={handleLike}
              className="size-6 flex justify-center items-center"
            />
          )
        }
        count={video.like_count}
      />
      <ActionsButtons
        icon={
          <CommentIcon className="size-6 flex justify-center items-center" />
        }
        count={video.comment_count}
      />
      <ActionsButtons
        icon={
          video.is_saved ? (
            <BookMarkIcon
              onClick={handleSave}
              className="size-6 fill-[#face15] flex justify-center items-center"
            />
          ) : (
            <BookMarkIcon
              onClick={handleSave}
              className="size-6 flex justify-center items-center"
            />
          )
        }
        count={video.save_count}
      />
      <ActionsButtons
        icon={
          <ShareIcon
            className="size-6 flex justify-center items-center"
            onClick={handleShare}
          />
        }
        count={video.repost_count}
      />
      
    </div>
  );
}
