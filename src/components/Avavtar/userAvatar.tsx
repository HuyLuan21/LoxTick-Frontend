import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/types/user.type";

export function UserAvatar({
  className,
  UserProfile,
}: {
  className?: string;
  UserProfile: UserProfile | null;
}) {
  const dicebearAvatar = useMemo(
    () =>
      createAvatar(lorelei, {
        seed: UserProfile?.username ?? "default",
        size: 128,
      }).toDataUri(),
    [UserProfile?.username],
  );

  return (
    <Avatar className={cn("h-20 w-20", className)}>
      <AvatarImage src={UserProfile?.avatar_url} />
      <AvatarFallback>
        <img
          src={dicebearAvatar}
          alt={UserProfile?.display_name || UserProfile?.username}
          className="h-full w-full"
        />
      </AvatarFallback>
    </Avatar>
  );
}
