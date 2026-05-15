import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/selector";
import { openLoginModal } from "@/redux/slices/modalSlice";
import { useCallback } from "react";

/**
 * Hook bọc một action: nếu chưa đăng nhập → mở login modal,
 * nếu đã đăng nhập → chạy action bình thường.
 */
export function useRequireAuth() {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const requireAuth = useCallback(
    (action: () => void) => {
      if (!currentUser) {
        dispatch(openLoginModal());
        return;
      }
      action();
    },
    [currentUser, dispatch],
  );

  return { requireAuth, isAuthenticated: !!currentUser };
}
