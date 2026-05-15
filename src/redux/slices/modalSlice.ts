import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  showLoginModal: boolean;
  showResetModal: boolean;
}

const initialState: ModalState = {
  showLoginModal: false,
  showResetModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal(state) {
      state.showLoginModal = true;
      state.showResetModal = false;
    },
    closeLoginModal(state) {
      state.showLoginModal = false;
    },
    openResetModal(state) {
      state.showResetModal = true;
      state.showLoginModal = false;
    },
    closeResetModal(state) {
      state.showResetModal = false;
    },
    closeAllModals(state) {
      state.showLoginModal = false;
      state.showResetModal = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openResetModal,
  closeResetModal,
  closeAllModals,
} = modalSlice.actions;

export default modalSlice.reducer;
