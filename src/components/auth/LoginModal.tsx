import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/services/authService";
import type { User } from "@/types/user.type";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
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
      const userData = await login(email, password);
      onLoginSuccess(userData);
      onClose();
    } catch {
      setError("Sai email hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-black">
            <span className="bg-clip-text text-transparent">LoxTick</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full text-white font-bold"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
