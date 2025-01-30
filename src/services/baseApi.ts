// services/baseApi.ts
import { RootState } from "@redux/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponse, Token } from "@types-d/type";
import { logout, setToken } from "@redux/slices/authSlice";

export function getAccessToken(): string | null {
  return (
    localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
  );
}

export function getRefreshToken(): string | null {
  return (
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken")
  );
}

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const state = api.getState() as RootState;
  const remember = state.auth.isRemembered;
  const fetchBaseQueryInstance = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json; charset=utf-8");
      headers.set("Accept", "application/json");
      return headers;
    },
    credentials: "include",
  });

  const result = await fetchBaseQueryInstance(args, api, extraOptions);

  // Check for 401 unauthorized error
  if (result.error && result.error.status === 401) {
    try {
      // Get current tokens
      const currentAccessToken = getAccessToken();
      const currentRefreshToken = getRefreshToken();

      if (!currentAccessToken || !currentRefreshToken) {
        return result;
      }

      const currentToken: Token = {
        accessToken: currentAccessToken,
        refreshToken: currentRefreshToken,
      };
      // Attempt to refresh token
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/Auth/refresh-token`,
        {
          method: "POST",
          body: JSON.stringify(currentToken),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: ApiResponse<object> = await response.json();

      if (!data || !data.token!.accessToken || !data.token!.refreshToken) {
        throw new Error("Failed to refresh token");
      }

      const { accessToken, refreshToken } = data.token!;

      // Save new tokens
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("accessToken", accessToken);
      storage.setItem("refreshToken", refreshToken);

      const token: Token = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      // Update the state with new access token
      api.dispatch(setToken(token));

      // Retry the original request with the new token
      const retryResult = await fetchBaseQueryInstance(args, api, extraOptions);
      return retryResult;
    } catch (refreshError) {
      // If refresh token fails, logout or handle accordingly
      api.dispatch(logout());
      return result;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Cart"],
  endpoints: () => ({}),
});
