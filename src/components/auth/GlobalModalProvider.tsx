import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  closeLoginModal,
  closeResetModal,
  openLoginModal,
  openResetModal,
} from "@/redux/slices/modalSlice";
import LoginModal from "./LoginModal";
import ResetModal from "./ResetModal";
import type { RootState } from "@/redux/store";

export default function GlobalModalProvider() {
  const dispatch = useAppDispatch();
  const showLogin = useAppSelector(
    (state: RootState) => state.modal.showLoginModal,
  );
  const showReset = useAppSelector(
    (state: RootState) => state.modal.showResetModal,
  );

  return (
    <>
      <LoginModal
        isOpen={showLogin}
        onClose={() => dispatch(closeLoginModal())}
        onForgot={() => dispatch(openResetModal())}
      />
      <ResetModal
        isOpen={showReset}
        onClose={() => dispatch(closeResetModal())}
        onBack={() => dispatch(openLoginModal())}
      />
    </>
  );
}
