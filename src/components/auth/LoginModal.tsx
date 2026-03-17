import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/services/authService";
// import type { User } from "@/types/user.type";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ!");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      onClose();

      window.location.href = "/";
    } catch {
      setError("Sai email hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ Dùng open + onOpenChange để Header control được modal
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl tracking-tight text-[#161823]">
            Đăng nhập vào LoxTick
          </DialogTitle>
          <DialogDescription>
            Nhập email và mật khẩu để tiếp tục.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="email">Email</Label>
            {/* ✅ Kết nối value + onChange vào state */}
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
        </FieldGroup>

        {/* ✅ Hiển thị lỗi nếu có */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <DialogFooter>
          <Label htmlFor="Đăng kí">
            Chưa có tài khoản?{" "}
            <a className="text-tiktok-red" href="/register">
              Đăng kí
            </a>
          </Label>

          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Huỷ
            </Button>
          </DialogClose>
          {/* ✅ Gọi handleSubmit khi bấm nút */}
          <Button
            className="bg-tiktok-red hover:bg-tiktok-red/80"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
