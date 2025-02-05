import { useAppDispatch } from "@redux/hooks";
import { useGoogleLoginMutation } from "@services/authApi";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [googleLoginMutation] = useGoogleLoginMutation();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response: any) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${response.access_token}` } }
        );

        console.log(userInfo);
        const result = await googleLoginMutation({
          credential: JSON.stringify(userInfo.data), // Gửi toàn bộ thông tin user
        }).unwrap();

        const authData = {
          ...result,
          token: {
            accessToken: result.token?.accessToken || "",
            refreshToken: result.token?.refreshToken || "",
            isRemembered: true,
          },
        };

        dispatch(login(authData));

        dispatch(
          openSnackbar({
            type: "success",
            message: "Đăng nhập Google thành công!",
          })
        );

        navigate("/");
      } catch (error: any) {
        dispatch(
          openSnackbar({
            type: "error",
            message: error?.data?.message || "Đăng nhập Google thất bại",
          })
        );
      }
    },
    onError: (error) => {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Đăng nhập Google thất bại",
        })
      );
      console.error("Google Login Error:", error);
    },
    flow: "implicit",
  });

  return (
    <>
      <div
        onClick={() => handleGoogleLogin()}
        className="relative flex rounded-lg hover:shadow-md transition-all duration-200 items-center justify-center gap-6 px-2 py-3 uppercase border cursor-pointer border-primary-300"
      >
        <div className="text-[24px] absolute left-[80px]">
          <FcGoogle />
        </div>
        <span className="font-semibold opacity-50 capitalize">
          Sign In with Google
        </span>
      </div>
    </>
  );
};

export default GoogleLoginButton;
