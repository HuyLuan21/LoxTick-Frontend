import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/selector";

export function UserAvatar({ className }: { className?: string }) {
  const currentUser = useAppSelector(selectCurrentUser);

  const dicebearAvatar = useMemo(
    () =>
      createAvatar(lorelei, {
        seed: currentUser?.username ?? "default",
        size: 128,
      }).toDataUri(),
    [currentUser?.username],
  );

  return (
    <Avatar className={cn("h-20 w-20", className)}>
      <AvatarImage src={currentUser?.avatar_url} />
      <AvatarFallback>
        <img
          src={dicebearAvatar}
          alt={currentUser?.display_name || currentUser?.username}
          className="h-full w-full"
        />
      </AvatarFallback>
    </Avatar>
  );
}
