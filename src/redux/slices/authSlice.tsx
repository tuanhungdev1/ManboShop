import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, Token } from "@types-d/type";
import { User } from "@types-d/user";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isRemembered: boolean;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isRemembered: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ApiResponse<object>>) => {
      const token = action.payload.token;
      if (token) {
        state.accessToken = token.accessToken || null;
        state.refreshToken = token.refreshToken || null;
        state.isRemembered = token.isRemembered || false;
      }
    },

    logout: () => {
      return initialState;
    },

    saveUser: (state, action: PayloadAction<ApiResponse<User>>) => {
      state.user = action.payload.data!;
    },

    setToken: (state, action: PayloadAction<Token>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { login, logout, saveUser, setToken } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) =>
  state.auth.refreshToken;
export const selectIsRemembered = (state: { auth: AuthState }) =>
  state.auth.isRemembered;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
