import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { uploadToCloudinary } from "@/services/Api/Upload";
import { UserAvatar } from "../Avavtar/userAvatar";
import type { User } from "@/types/user.type";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onSave: (data: EditProfilePayload) => Promise<void>; // ← bỏ optional
}

interface EditProfileForm {
  username: string;
  display_name: string;
  bio: string;
  avatar?: File;
}

interface EditProfilePayload {
  username: string;
  display_name: string;
  bio: string;
  avatar_url?: string;
}

export function EditProfileModal({
  open,
  onOpenChange,
  user,
  onSave,
}: EditProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dicebearAvatar = useMemo(
    () =>
      createAvatar(lorelei, {
        seed: user.username ?? "default",
        size: 128,
      }).toDataUri(),
    [user.username],
  );
  const [form, setForm] = useState<EditProfileForm>({
    username: user.username ?? "",
    display_name: user.display_name ?? "",
    bio: user.bio ?? "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string>(
    user.avatar_url ?? dicebearAvatar,
  );
  const [loading, setLoading] = useState(false);
  const isDirty =
    form.username !== (user.username ?? "") ||
    form.display_name !== (user.display_name ?? "") ||
    form.bio !== (user.bio ?? "") ||
    form.avatar !== undefined;
  useEffect(() => {
    setForm({
      username: user.username ?? "",
      display_name: user.display_name ?? "",
      bio: user.bio ?? "",
    });
    setAvatarPreview(user.avatar_url ?? dicebearAvatar);
  }, [user]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, avatar: file }));
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    setLoading(true);
    try {
      let avatarUrl: string | undefined;

      if (form.avatar) {
        const result = await uploadToCloudinary(form.avatar); // ← gọi Cloudinary
        avatarUrl = result.secure_url;
      }

      await onSave({
        username: form.username,
        display_name: form.display_name,
        bio: form.bio,
        avatar_url: avatarUrl,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Lỗi khi lưu hồ sơ:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setForm({
      username: user.username ?? "",
      display_name: user.display_name ?? "",
      bio: user.bio ?? "",
    });
    setAvatarPreview(user.avatar_url ?? dicebearAvatar);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Sửa hồ sơ</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Separator />

        <div className="space-y-0 divide-y divide-border">
          {/* Ảnh hồ sơ */}
          <div className="flex items-center gap-6 py-5">
            <Label className="w-24 shrink-0 text-sm font-semibold text-foreground">
              Ảnh hồ sơ
            </Label>
            <div className="flex flex-1 justify-center">
              <div className="relative inline-block">
                <UserAvatar src={avatarPreview} fallbackName={user.username} />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-secondary ring-2 ring-background transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5 text-foreground" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
          </div>

          {/* Loxtik ID */}
          <div className="flex gap-6 py-5">
            <Label className="w-24 shrink-0 pt-2 text-sm font-semibold text-foreground">
              Loxtik ID
            </Label>
            <div className="flex-1 space-y-2">
              <Input
                value={form.username}
                maxLength={30}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                  value = value.replace(/[^a-zA-Z0-9._]/g, "");
                  setForm((prev) => ({ ...prev, username: value }));
                }}
                className="bg-secondary/50"
                placeholder="username"
              />
              <p className="text-xs text-muted-foreground">
                {`${window.location.origin}`}/user/@
                {form.username || "username"}
              </p>
              <p className="text-xs text-muted-foreground">
                Loxtik ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và
                dấu chấm. Khi thay đổi Loxtik ID, liên kết hồ sơ của bạn cũng sẽ
                thay đổi. Loxtik ID chỉ có thể thay đổi 1 lần mỗi 30 ngày.
              </p>
            </div>
          </div>

          {/* Tên hiển thị */}
          <div className="flex gap-6 py-5">
            <Label className="w-24 shrink-0 pt-2 text-sm font-semibold text-foreground">
              Tên
            </Label>
            <div className="flex-1 space-y-2">
              <Input
                value={form.display_name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    display_name: e.target.value,
                  }))
                }
                className="bg-secondary/50"
                placeholder="Tên hiển thị"
              />
            </div>
          </div>

          {/* Tiểu sử */}
          <div className="flex gap-6 py-5">
            <Label className="w-24 shrink-0 pt-2 text-sm font-semibold text-foreground">
              Tiểu sử
            </Label>
            <div className="flex-1 space-y-2">
              <Textarea
                value={form.bio}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    bio: e.target.value.slice(0, 80),
                  }))
                }
                className="h-24 resize-none overflow-y-auto bg-secondary/50 break-all"
                placeholder="Viết gì đó về bạn..."
              />
              <p className="text-right text-xs text-muted-foreground">
                {form.bio.length}/80
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            className="cursor-pointer px-6"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !isDirty}
            className="cursor-pointer bg-tiktok-red px-6 text-white hover:bg-tiktok-red/80"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
