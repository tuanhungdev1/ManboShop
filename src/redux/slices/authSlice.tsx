import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "@types-d/type";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ApiResponse<object>>) => {
      state.accessToken = action.payload.token?.accessToken || null;
      state.refreshToken = action.payload.token?.refreshToken || null;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
