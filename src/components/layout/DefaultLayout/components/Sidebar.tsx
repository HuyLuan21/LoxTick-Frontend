import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, NavLink, useLocation } from "react-router";
import { UserAvatar } from "@/components/Avavtar/userAvatar";
import { useAppSelector } from "@/redux/hooks";
import { userServices } from "@/services/userServices";
import { useEffect, useState } from "react";
import type { UserProfile } from "@/types/user.type";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  NotificationIcon,
  NotificationActiveIcon,
  FollowIcon,
  FollowActiveIcon,
  FriendsIcon,
  FriendsActiveIcon,
  HomeIcon,
  HomeActiveIcon,
  MessageIcon,
  MessageActiveIcon,
  MoreIcon,
  UploadIcon,
} from "@/components/Icons/Icons";

export function AppSidebar() {
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  // const [openModal, setOpenModal] = useState(false);
  const [following, setFollowing] = useState<UserProfile[]>([]);
  useEffect(() => {
    if (!currentUser?.id) {
      setFollowing([]);
      return;
    }
    let isMounted = true;
    userServices
      .getFollowingList(currentUser.id, 5)
      .then((response) => {
        if (isMounted) setFollowing(response.data);
      })
      .catch((err) => {
        console.error("Error get following:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [currentUser?.id]);
  interface NavItem {
    type: "button" | "link";
    title: string;
    url: string;
    icon: React.ElementType;
    activeIcon?: React.ElementType;
    badge?: number;
    requiresAuth?: boolean;
  }
  const navItems: NavItem[] = [
    {
      type: "link",
      title: "Đề xuất",
      url: "/",
      icon: HomeIcon,
      activeIcon: HomeActiveIcon,
    },
    {
      type: "link",
      title: "Đã follow",
      url: "/following",
      icon: FollowIcon,
      activeIcon: FollowActiveIcon,
    },
    {
      type: "link",
      title: "Bạn bè",
      url: "/friends",
      icon: FriendsIcon,
      activeIcon: FriendsActiveIcon,
      requiresAuth: true,
    },
    {
      type: "link",
      title: "Tin nhắn",
      url: "/messages",
      icon: MessageIcon,
      activeIcon: MessageActiveIcon,
      requiresAuth: true,
    },
    {
      type: "button",
      title: "Hoạt động",
      url: "/activity",
      icon: NotificationIcon,
      activeIcon: NotificationActiveIcon,
      requiresAuth: true,
    },
    {
      type: "link",
      title: "Tải lên",
      url: "/upload",
      icon: UploadIcon,
    },
    {
      type: "link",
      title: "Hồ sơ",
      url: `/user/@${currentUser?.username}`,
      icon: () => {
        if (!currentUser?.username)
          return (
            <svg
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8! h-8!"
            >
              <path d="M24 3a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 4a6 6 0 1 0 0 12.00A6 6 0 0 0 24 7Zm0 19c10.3 0 16.67 6.99 17 17 .02.55-.43 1-1 1h-2c-.54 0-.98-.45-1-1-.3-7.84-4.9-13-13-13s-12.7 5.16-13 13c-.02.55-.46 1-1.02 1h-2c-.55 0-1-.45-.98-1 .33-10.01 6.7-17 17-17Z"></path>
            </svg>
          );
        return (
          <UserAvatar
            className="w-8 h-8 "
            userName={currentUser.username}
            userAvatarUrl={currentUser?.avatar_url}
          />
        );
      },
    },
    {
      type: "button",
      title: "Thêm",
      url: "/more",
      icon: MoreIcon,
      activeIcon: MoreIcon,
    },
  ];

  const visibleNavItems = navItems.filter(
    (item) => !item.requiresAuth || currentUser,
  );

  return (
    <Sidebar>
      <SidebarHeader className="py-2">
        <a href="/" className="flex items-center gap-1">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M29.5 7.5C27.8 5.6 26.9 3.1 27 0.5H21.2V27.3C21.1 29.5 19.3 31.3 17 31.3C14.7 31.3 12.8 29.4 12.8 27.1C12.8 24.3 15.4 22.2 18.2 23V17C12 16.3 6.9 21.1 6.9 27.1C6.9 33 11.7 37.8 17.6 37.5C23.2 37.2 27.6 32.5 27.6 26.9V13.7C29.9 15.4 32.7 16.4 35.6 16.4V10.6C33 10.6 31 9.4 29.5 7.5Z"
              fill="#25f4ee"
              transform="translate(1, 1)"
            />
            <path
              d="M29.5 7.5C27.8 5.6 26.9 3.1 27 0.5H21.2V27.3C21.1 29.5 19.3 31.3 17 31.3C14.7 31.3 12.8 29.4 12.8 27.1C12.8 24.3 15.4 22.2 18.2 23V17C12 16.3 6.9 21.1 6.9 27.1C6.9 33 11.7 37.8 17.6 37.5C23.2 37.2 27.6 32.5 27.6 26.9V13.7C29.9 15.4 32.7 16.4 35.6 16.4V10.6C33 10.6 31 9.4 29.5 7.5Z"
              fill="#fe2c55"
              transform="translate(-1, -1)"
            />
            <path
              d="M29.5 7.5C27.8 5.6 26.9 3.1 27 0.5H21.2V27.3C21.1 29.5 19.3 31.3 17 31.3C14.7 31.3 12.8 29.4 12.8 27.1C12.8 24.3 15.4 22.2 18.2 23V17C12 16.3 6.9 21.1 6.9 27.1C6.9 33 11.7 37.8 17.6 37.5C23.2 37.2 27.6 32.5 27.6 26.9V13.7C29.9 15.4 32.7 16.4 35.6 16.4V10.6C33 10.6 31 9.4 29.5 7.5Z"
              fill="#161823"
            />
          </svg>
          <span className="text-2xl font-black text-foreground tracking-tight ">
            LoxTik
          </span>
        </a>
        <div className="flex w-full relative items-center bg-gray-100 dark:bg-[#2a2a2a] dark:caret-tiktok-red rounded-full px-4 h-10 transition-all duration-200 outline-none">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 dark:text-white placeholder-gray-400"
          />
          <svg
            className="w-4 h-4 text-gray-400 shrink-0 absolute right-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Nav chính */}
        <SidebarGroup>
          <SidebarMenu>
            {visibleNavItems.map((item) => {
              const isActive = location.pathname === item.url;
              const Icon =
                isActive && item.activeIcon ? item.activeIcon : item.icon;

              return (
                <SidebarMenuItem className="py-2" key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="relative h-10 text-base font-semibold
                    data-[active=true]:font-semibold
                    data-[active=true]:text-tiktok-red
                    data-[active=true]:[&_svg]:text-tiktok-red"
                  >
                    {item.type === "link" ? (
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3"
                      >
                        <Icon className="w-8! h-8!" />
                        <span>{item.title}</span>
                      </NavLink>
                    ) : (
                      <button type="button" className="flex items-center gap-3">
                        <Icon className="w-8! h-8!" />
                        <span>{item.title}</span>
                      </button>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Danh sách following */}
        {following.length > 0 && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Các tài khoản Đã follow
            </SidebarGroupLabel>
            <SidebarMenu className="mt-1">
              {following.map((user) => (
                <SidebarMenuItem key={user.username}>
                  <SidebarMenuButton asChild className="h-12">
                    <Link
                      to={`user/@${user.username}`}
                      className="flex items-center gap-3"
                    >
                      <UserAvatar
                        className="w-8 h-8"
                        userName={user.username}
                        userAvatarUrl={user.avatar_url}
                      />
                      <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold">
                          {user.display_name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.username}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Button
              variant={"ghost"}
              className="w-full justify-start outline-none py-2 border-none"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H6Zm0 12a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H6ZM5 35a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2Zm11-25a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H16Zm0 12a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H16Zm-1 13a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H16a1 1 0 0 1-1-1v-2Z"></path>
              </svg>
              Xem tất cả
            </Button>
          </SidebarGroup>
        )}
        {!currentUser && (
          <div className="px-2 h-10">
            <Button className="w-full h-full rounded-lg bg-tiktok-red text-white text-sm font-bold hover:opacity-90 transition">
              Đăng nhập
            </Button>
          </div>
        )}
      </SidebarContent>
      <Separator />
      <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground">
        <Link to={"/terms-of-use"} className="cursor-pointer font-semibold">
          Điều khoản sử dụng
        </Link>
        <Link to={"/privacy-policy"} className="cursor-pointer font-semibold">
          Chính sách quyền riêng tư
        </Link>
        <Link
          to={"https://github.com/HuyLuan21/LoxTick-Frontend"}
          className="cursor-pointer font-semibold"
        >
          GitHub
        </Link>
        <Link
          to={
            "mailto:nguyenhuyluan312@gmail.com?subject=Gợi%20ý%20cải%20thiện%20dịch%20vụ"
          }
          className="cursor-pointer font-semibold"
        >
          Gửi phản hồi
        </Link>
        © 2025 TikTok Clone
      </SidebarFooter>
    </Sidebar>
  );
}
