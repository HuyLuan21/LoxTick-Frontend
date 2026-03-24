import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { userServices } from "@/services/userServices";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bookmark,
  ChevronDown,
  Heart,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  // Pin,
  // Play,
  Repeat2,
  SquarePlay,
  UserPlus,
} from "lucide-react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { EditProfileModal } from "@/components/auth/EditProfileModal";
import type { UserProfile } from "@/types/user.type";

type SortType = "Mới nhất" | "Thịnh Hành" | "Cũ nhất";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [following, setFollowing] = useState(false);
  const [sort, setSort] = useState<SortType>("Mới nhất");
  const [editOpen, setEditOpen] = useState(false);

  const dicebearAvatar = useMemo(
    () =>
      createAvatar(lorelei, {
        seed: user?.username ?? "default",
        size: 128,
      }).toDataUri(),
    [user?.username],
  );

  const isOwner = !!currentUser && currentUser.username === user?.username;
  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);

    userServices
      .getUser(username)
      .then((data) => setUser(data))
      .catch(() => setError("Không thể tải thông tin người dùng."))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">
          {error ?? "Người dùng không tồn tại."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-300 px-6 pb-4 pt-8">
        {/* Profile Header */}
        <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row">
          <Avatar className="h-52 w-52 shrink-0 ring-2 ring-border">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>
              <img
                src={dicebearAvatar}
                alt={user.username}
                className="h-full w-full"
              />
            </AvatarFallback>
          </Avatar>

          <div className="my-auto min-w-0 flex-1">
            {/* Names */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <h1 className="text-[22px] font-bold tracking-tight text-foreground">
                {user.username}
              </h1>
              <span className="text-base text-muted-foreground">
                {user.display_name || user.username}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {isOwner ? (
                <>
                  <Button
                    onClick={() => setEditOpen(true)}
                    className="cursor-pointer rounded bg-tiktok-red px-5 text-sm font-semibold text-white hover:bg-[#e0253c]"
                  >
                    <Pencil className="mr-1.5 h-4 w-4" />
                    Sửa hồ sơ
                  </Button>

                  <EditProfileModal
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    user={user}
                    onSave={async (data) => {
                      const res = await userServices.updateProfile(data);
                      if (res.user && res.user.username !== user.username) {
                        window.location.href = `/user/@${res.user.username}`;
                      } else {
                        window.location.reload();
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setFollowing(!following)}
                    className={`cursor-pointer rounded px-6 text-sm font-bold ${
                      following
                        ? "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        : "bg-tiktok-red text-white hover:bg-[#e0253c]"
                    }`}
                  >
                    {following ? "Đang follow" : "Follow"}
                  </Button>

                  <Button
                    variant="outline"
                    className="cursor-pointer rounded px-5 text-sm font-semibold"
                  >
                    <MessageCircle className="mr-1.5 h-4 w-4" />
                    Tin nhắn
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer rounded"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* More — luôn hiện, menu khác nhau theo isOwner */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer rounded"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-max">
                  {isOwner ? (
                    <DropdownMenuItem className="cursor-pointer">
                      Cài đặt tài khoản
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem className="cursor-pointer">
                        Báo cáo
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Chặn
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem className="cursor-pointer">
                    Sao chép liên kết
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Stats */}
            <div className="mb-3 flex flex-wrap gap-5">
              {[
                { num: user.following ?? "0", label: "Đã follow" },
                { num: user.followers ?? "0", label: "Follower" },
                { num: user.likes ?? "0", label: "Lượt thích" },
              ].map(({ num, label }) => (
                <button
                  key={label}
                  className="flex cursor-pointer items-baseline gap-1.5 transition-opacity hover:opacity-75"
                >
                  <span className="text-base font-bold text-foreground">
                    {num}
                  </span>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </button>
              ))}
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground">
              {user.bio ?? "Chưa có tiểu sử."}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <div className="flex items-center justify-between border-b border-border">
            <TabsList
              variant="line"
              className="h-auto gap-0 bg-transparent p-0"
            >
              {[
                {
                  value: "videos",
                  icon: <SquarePlay className="h-4 w-4" />,
                  label: "Video",
                },
                {
                  value: "repost",
                  icon: <Repeat2 className="h-4 w-4" />,
                  label: "Bài đăng lại",
                },
                {
                  value: "liked",
                  icon: <Heart className="h-4 w-4" />,
                  label: "Đã thích",
                },
                {
                  value: "bookmarked",
                  icon: <Bookmark className="h-4 w-4" />,
                  label: "Đã lưu",
                },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 font-semibold text-lg"
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-1 cursor-pointer gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  {sort}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-35">
                {(["Mới nhất", "Thịnh Hành", "Cũ nhất"] as SortType[]).map(
                  (s) => (
                    <DropdownMenuItem
                      key={s}
                      onClick={() => setSort(s)}
                      className={`cursor-pointer ${
                        sort === s
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {sort === s && <span className="mr-2">✓</span>}
                      {s}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
