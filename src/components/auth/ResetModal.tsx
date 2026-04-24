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
import { useState } from "react";
import {
  forgotPassword,
  resetPassword,
  verifyOtp,
} from "@/services/authService";

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export default function ResetModal({
  isOpen,
  onClose,
  onBack,
}: ResetModalProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleClose = () => {
    setEmail("");
    setOtp("");
    setPassword("");
    setError("");
    setOtpSent(false);
    setCountdown(0);
    onClose();
  };

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

  // Chỉ gửi OTP, không block nhập password
  const handleSendOtp = async () => {
    if (!email) {
      setError("Vui lòng nhập email!");
      return;
    }
    try {
      setSendLoading(true);
      setError("");
      await forgotPassword(email);
      setOtpSent(true);
      startCountdown();
    } catch {
      setError("Email không tồn tại hoặc có lỗi xảy ra!");
    } finally {
      setSendLoading(false);
    }
  };

 
  const handleSubmit = async () => {
    if (!otpSent) {
      setError("Vui lòng gửi mã OTP trước!");
      return;
    }
    if (otp.length !== 6) {
      setError("OTP phải gồm 6 chữ số!");
      return;
    }

    try {
      setSubmitLoading(true);
      setError("");
      await verifyOtp(otp);
      await resetPassword(otp, password);
      handleClose();
      onBack();
    } catch {
      setError("OTP không hợp lệ hoặc đã hết hạn!");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl tracking-tight text-[#161823]">
            Đặt lại mật khẩu
          </DialogTitle>
          <DialogDescription>
            Nhập email, nhận mã OTP và đặt mật khẩu mới.
          </DialogDescription>
        </DialogHeader>

        {/* ✅ Tất cả input hiện sẵn */}
        <FieldGroup className="my-4">
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
                {sendLoading
                  ? "..."
                  : countdown > 0
                    ? `${countdown}s`
                    : "Gửi mã"}
              </Button>
            </div>
            {/* ✅ Thông báo đã gửi */}
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
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </Field>
        </FieldGroup>

        {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

        <Button
          className="w-full bg-tiktok-red hover:bg-tiktok-red/80"
          onClick={handleSubmit}
          disabled={submitLoading}
        >
          {submitLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </Button>

        <DialogFooter className="justify-center! sm:justify-center!">
          <p className="text-sm text-muted-foreground">
            Quay lại đăng nhập?{" "}
            <button
              className="text-tiktok-red hover:underline font-medium"
              onClick={() => {
                handleClose();
                onBack();
              }}
            >
              Đăng nhập
            </button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
