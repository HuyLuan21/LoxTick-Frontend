import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useMemo } from "react";

export function UserAvatar({
  src,
  fallbackName,
}: {
  src: string;
  fallbackName: string;
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
    <Avatar className="h-20 w-20">
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
