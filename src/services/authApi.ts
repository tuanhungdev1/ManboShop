import { LoginFormData } from "@pages/auth/LoginPage";
import { RegisterFormData } from "@pages/auth/RegisterPage";
import { login } from "@redux/slices/authSlice";
import { ApiResponse, Token } from "@types-d/type";
import { baseApi } from "./baseApi";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { authStorage } from "@utils/authStorage";
import { LoginAdminFormData } from "@pages/admin/auth/LoginAdminPage";

export interface LoginGoogleDto {
  credential: string;
}

export interface LoginFacebookDto {
  credential: string;
}

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
      // Check email availability
      checkEmail: builder.mutation<ApiResponse<boolean>, string>({
        query: (email) => ({
          url: `Auth/check-email/${email}`,
          method: "POST",
        }),
      }),
      googleLogin: builder.mutation<ApiResponse<object>, LoginGoogleDto>({
        query: ({ credential }) => ({
          url: `Auth/google-login`,
          body: {
            credential: credential,
          },
          method: "POST",
        }),
        invalidatesTags: ["User"],
      }),
      facebookLogin: builder.mutation<ApiResponse<object>, LoginFacebookDto>({
        query: ({ credential }) => ({
          url: "/auth/facebook-login",
          method: "POST",
          body: {
            credential: credential,
          },
        }),
      }),
      login: builder.mutation<ApiResponse<object>, LoginFormData>({
        query: ({ password, username, isRemember }) => {
          return {
            url: "/Auth/login",
            body: { password, username, isRemember },
            method: "POST",
          };
        },
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;

            const authData = {
              ...data,
              token: {
                accessToken: data.token?.accessToken || "",
                refreshToken: data.token?.refreshToken || "",
                isRemembered: _arg.isRemember,
              },
            };

            if (_arg.isRemember) {
              dispatch(login(authData));
            } else {
              authStorage.saveAuthData(authData.token, _arg.isRemember);
            }
          } catch (error: any) {
            dispatch(
              openSnackbar({
                type: "error",
                message: error.data.Message || "Đăng nhập thất bại",
              })
            );
          }
        },
        invalidatesTags: ["User", "CurentUser"],
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
      refreshToken: builder.mutation<ApiResponse<object>, Token>({
        query: (tokenDto) => ({
          url: "Auth/refresh-token",
          method: "POST",
          body: tokenDto,
        }),
      }),

      loginAdmin: builder.mutation<ApiResponse<object>, LoginAdminFormData>({
        query: ({ password, username, isRemember }) => {
          return {
            url: "/Auth/login",
            body: { password, username, isRemember },
            method: "POST",
          };
        },
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;

            const authData = {
              ...data,
              token: {
                accessToken: data.token?.accessToken || "",
                refreshToken: data.token?.refreshToken || "",
                isRemembered: _arg.isRemember,
              },
            };

            if (_arg.isRemember) {
              dispatch(login(authData));
            } else {
              authStorage.saveAuthData(authData.token, _arg.isRemember);
            }
          } catch (error: any) {
            dispatch(
              openSnackbar({
                type: "error",
                message: error.data.Message || "Đăng nhập thất bại",
              })
            );
          }
        },
        invalidatesTags: ["User", "CurentUser"],
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useRefreshTokenMutation,
  useGoogleLoginMutation,
  useFacebookLoginMutation,
  useLoginAdminMutation,
} = authApi;
