// src/components/layout/Sidebar.tsx
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

import { Link, useLocation } from "react-router";
import {
  Home,
  Users,
  UserCheck,
  Send,
  Bell,
  User,
  MoreHorizontal,
} from "lucide-react";

const navItems = [
  { title: "Đề xuất", url: "/", icon: Home },
  { title: "Đã follow", url: "/following", icon: UserCheck },
  { title: "Bạn bè", url: "/friends", icon: Users },
  { title: "Tin nhắn", url: "/messages", icon: Send },
  { title: "Hoạt động", url: "/activity", icon: Bell, badge: 1 },
  { title: "Hồ sơ", url: "/profile", icon: User },
  { title: "Thêm", url: "/more", icon: MoreHorizontal },
];

const followingList = [
  {
    name: "Trần Bơm",
    username: "tranbom.vcu",
    avatar: "https://i.pravatar.cc/32?u=1",
  },
  {
    name: "Đinh Mạnh",
    username: "dinhducmanhh",
    avatar: "https://i.pravatar.cc/32?u=2",
  },
  {
    name: "Nguyễn Linh",
    username: "nguyenlinh.97",
    avatar: "https://i.pravatar.cc/32?u=3",
  },
  {
    name: "Minh Tú",
    username: "minhtu.official",
    avatar: "https://i.pravatar.cc/32?u=4",
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="mt-14 px-0 py-0"></SidebarHeader>
      {/* Logo */}
      <SidebarContent>
        {/* Nav chính */}
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.url}
                  className="relative h-11 text-base font-semibold
                  data-[active=true]:font-semibold
                  data-[active=true]:text-tiktok-red
                  data-[active=true]:[&_svg]:text-tiktok-red"
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <item.icon className="h-6! w-6! shrink-0!" />
                    <span>{item.title}</span>

                    {/* Badge thông báo */}
                    {item.badge ? (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Danh sách following */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Các tài khoản Đã follow
          </SidebarGroupLabel>
          <SidebarMenu className="mt-1">
            {followingList.map((user) => (
              <SidebarMenuItem key={user.username}>
                <SidebarMenuButton asChild className="h-12">
                  <Link
                    to={`/@${user.username}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover shrink-0"
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.username}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground">
        © 2025 TikTok Clone
      </SidebarFooter>
    </Sidebar>
  );
}
