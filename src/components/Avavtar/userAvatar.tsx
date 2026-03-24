import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function UserAvatar({
  src,
  fallbackName,
  className,
}: {
  src: string;
  fallbackName: string;
  className?: string;
}) {
  const dicebearAvatar = useMemo(
    () =>
      createAvatar(lorelei, {
        seed: fallbackName ?? "default",
        size: 128,
      }).toDataUri(),
    [fallbackName],
  );
  return (
    <Avatar className={cn("h-20 w-20", className)}>
      <AvatarImage src={src} />
      <AvatarFallback>
        <img
          src={dicebearAvatar}
          alt={fallbackName}
          className="h-full w-full"
        />
      </AvatarFallback>
    </Avatar>
  );
}
