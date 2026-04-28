import { useState } from "react";
import { register, requestRegisterOtp } from "@/services/authService";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterModal({ onSwitch }: { onSwitch: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!email) {
      setError("Vui lòng nhập email!");
      return;
    }
    try {
      setSendLoading(true);
      setError("");
      await requestRegisterOtp(email);
      setOtpSent(true);
      startCountdown();
    } catch {
      setError("Email không hợp lệ hoặc đã tồn tại!");
    } finally {
      setSendLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!username || !email || !otp || !password) {
      setError("Vui lòng nhập đầy đủ!");
      return;
    }
    if (otp.length !== 6) {
      setError("OTP phải gồm 6 chữ số!");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await register(username, email, otp, password);
      onSwitch();
    } catch {
      setError("Email đã tồn tại hoặc có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl tracking-tight text-[#161823]">
          Đăng ký tài khoản LoxTick
        </DialogTitle>
        <DialogDescription>
          Nhập thông tin để tạo tài khoản mới.
        </DialogDescription>
      </DialogHeader>

      <FieldGroup className="my-4">
        <Field>
          <Label htmlFor="username">Tên đăng nhập</Label>
          <Input
            id="username"
            type="text"
            placeholder="huandaden.penguin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>

        <Field>
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <Button
              className="shrink-0 bg-tiktok-red hover:bg-tiktok-red/80"
              onClick={handleSendOtp}
              disabled={sendLoading || countdown > 0}
            >
              {sendLoading ? "..." : countdown > 0 ? `${countdown}s` : "Gửi mã"}
            </Button>
          </div>
          {/* Thông báo đã gửi */}
          {otpSent && (
            <p className="text-xs text-green-600 mt-1">
              Mã OTP đã gửi đến {email}!{" "}
              {countdown === 0 && (
                <button
                  className="text-tiktok-red hover:underline"
                  onClick={handleSendOtp}
                >
                  Gửi lại
                </button>
              )}
            </p>
          )}
        </Field>

        <Field>
          <Label htmlFor="otp">Mã OTP</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Nhập mã gồm 6 chữ số"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
          />
        </Field>

        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
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
        {loading ? "Đang xử lý..." : "Đăng ký"}
      </Button>

      <DialogFooter className="justify-center! sm:justify-center!">
        <p className="text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <button
            className="text-tiktok-red hover:underline font-medium"
            onClick={onSwitch}
          >
            Đăng nhập
          </button>
        </p>
      </DialogFooter>
    </>
  );
}
