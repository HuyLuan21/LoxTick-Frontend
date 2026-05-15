import type { RootState } from "./store";

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export const selectShowLoginModal = (state: RootState) =>
  state.modal.showLoginModal;
export const selectShowResetModal = (state: RootState) =>
  state.modal.showResetModal;
