import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "@types-d/type";
import { User } from "@types-d/user";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isRemembered: boolean;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isRemembered: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ApiResponse<object>>) => {
      state.accessToken = action.payload.token?.accessToken || null;
      state.refreshToken = action.payload.token?.refreshToken || null;
      state.isRemembered = action.payload.token?.isRemembered || false;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },

    saveUser: (state, action: PayloadAction<ApiResponse<User>>) => {
      state.user = action.payload.data!;
    },
  },
});

export const { login, logout, saveUser } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) =>
  state.auth.refreshToken;
export const selectIsRemembered = (state: { auth: AuthState }) =>
  state.auth.isRemembered;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
