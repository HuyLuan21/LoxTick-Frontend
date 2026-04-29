import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function UserAvatar({
  className,
  userName,
  userAvatarUrl,
}: {
  className?: string;
  userName: string;
  userAvatarUrl?: string;
}) {
  const dicebearAvatar = useMemo(
    () =>
      createAvatar(lorelei, {
        seed: userName ?? "default",
        size: 128,
      }).toDataUri(),
    [userName],
  );

  return (
    <Avatar className={cn("h-20 w-20", className)}>
      <AvatarImage src={userAvatarUrl} />
      <AvatarFallback>
        <img
          src={dicebearAvatar}
          alt={userName || userAvatarUrl}
          className="h-full w-full"
        />
      </AvatarFallback>
    </Avatar>
  );
}
