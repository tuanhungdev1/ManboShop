import { LoginFormData } from "@pages/auth/LoginPage";
import { RegisterFormData } from "@pages/auth/RegisterPage";
import { login } from "@redux/slices/authSlice";
import { RootState } from "@redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@types-d/type";

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      console.log(import.meta.env.VITE_BASE_URL);
      const state = getState() as RootState;
      console.log("Current state:", state);

      const token = state.auth.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      register: builder.mutation<ApiResponse<object>, RegisterFormData>({
        query: ({
          email,
          password,
          confirmPassword,
          username,
          firstname,
          lastname,
          terms,
          subscribes,
        }) => {
          return {
            url: "/Auth/register",
            body: {
              username,
              email,
              password,
              confirmPassword,
              firstname,
              lastname,
              terms,
              subscribes,
            },
            method: "POST",
          };
        },
      }),
      login: builder.mutation<ApiResponse<object>, LoginFormData>({
        query: ({ password, username, isRememberMe }) => {
          return {
            url: "/Auth/login",
            body: { password, username, isRememberMe },
            method: "POST",
          };
        },
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            // Dispatch action login từ authSlice khi có response thành công
            dispatch(login(data));
          } catch (error) {
            // Handle error nếu cần
            console.error("Login failed:", error);
          }
        },
      }),
      verifyOTP: builder.mutation({
        query: ({ email, verificationCode }) => {
          return {
            url: "/verify-otp",
            body: { email, verificationCode },
            method: "POST",
          };
        },
      }),
      getAuthUser: builder.query({
        query: () => "/auth-user",
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAuthUserQuery,
  useVerifyOTPMutation,
} = rootApi;
