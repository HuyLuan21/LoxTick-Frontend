import type { User } from "@/types/user.type";
import type { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import * as authService from "@/services/authService";

const initialState: {
  currentUser: User | null;
} = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
  },
});

export const getCurrentUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authService.getCurrentUser();

      dispatch(setCurrentUser(data));
    } catch (_) {
      dispatch(setCurrentUser(null));
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      await authService.logout();
      localStorage.removeItem("access_token");
      dispatch(setCurrentUser(null));
    } catch (_) {
      dispatch(setCurrentUser(null));
    }
  };
};

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
