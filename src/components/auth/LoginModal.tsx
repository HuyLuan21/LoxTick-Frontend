import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { useState } from "react";
import { getCurrentUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import RegisterModal from "./RegisterModal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onForgot: () => void;
}
type Mode = "login" | "register";

export default function LoginModal({
  isOpen,
  onClose,
  onForgot,
}: LoginModalProps) {
  const [mode, setMode] = useState<Mode>("login");
  const handleClose = () => {
    setMode("login");
    onClose();
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-sm">
          {/* key quan trọng: tự reset state khi đổi mode */}
          {mode === "login" ? (
            <LoginForm
              key="login"
              onClose={handleClose}
              onSwitch={() => setMode("register")}
              onForgot={onForgot}
            />
          ) : (
            <RegisterModal key="register" onSwitch={() => setMode("login")} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function LoginForm({
  onClose,
  onSwitch,
  onForgot,
}: {
  onClose: () => void;
  onSwitch: () => void;
  onForgot: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ!");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      await dispatch(getCurrentUser());
      onClose();
    } catch {
      setError("Sai email hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl tracking-tight text-[#161823]">
          Đăng nhập vào LoxTick
        </DialogTitle>
        <DialogDescription>
          Nhập email và mật khẩu để tiếp tục.
        </DialogDescription>
      </DialogHeader>

      {/* Fields */}
      <FieldGroup className="my-4">
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field>
          {/* Label hàng password + link quên mật khẩu cùng hàng */}
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mật khẩu</Label>
            <a
              onClick={onForgot}
              className="text-xs text-tiktok-red hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
      </FieldGroup>

      {/* Error */}
      {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

      <Button
        className="w-full bg-tiktok-red hover:bg-tiktok-red/80"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Đăng nhập"}
      </Button>

      <DialogFooter className="justify-center! sm:justify-center!">
        <p className="text-sm text-muted-foreground">
          Bạn chưa có tài khoản?{" "}
          <a
            className="text-tiktok-red hover:underline font-medium"
            onClick={onSwitch}
          >
            Đăng ký
          </a>
        </p>
      </DialogFooter>
    </>
  );
}
