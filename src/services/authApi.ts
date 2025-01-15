import { LoginFormData } from "@pages/auth/LoginPage";
import { RegisterFormData } from "@pages/auth/RegisterPage";
import { login } from "@redux/slices/authSlice";
import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
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
    };
  },
});

export const { useRegisterMutation, useLoginMutation, useVerifyOTPMutation } =
  authApi;
