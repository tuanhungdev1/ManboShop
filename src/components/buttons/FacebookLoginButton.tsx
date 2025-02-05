import { useAppDispatch } from "@redux/hooks";
import { useFacebookLoginMutation } from "@services/authApi";
import { FaFacebook } from "react-icons/fa";
import { login } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";

const FacebookLoginButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [facebookLoginMutation] = useFacebookLoginMutation();

  const handleFacebookLogin = async (response: any) => {
    try {
      console.log("Initial Facebook response:", response);

      // Lấy thông tin user từ Facebook Graph API
      const userResponse = await fetch(
        `https://graph.facebook.com/me?fields=id,email,first_name,last_name,picture&access_token=${response.accessToken}`
      );
      const userInfo = await userResponse.json();
      console.log("Facebook user info:", userInfo);

      const result = await facebookLoginMutation({
        credential: JSON.stringify({
          email: userInfo.email,
          given_name: userInfo.first_name,
          family_name: userInfo.last_name,
          picture: userInfo.picture?.data?.url,
          email_verified: true,
          accessToken: response.accessToken,
          userID: response.userID,
        }),
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
          message: "Đăng nhập Facebook thành công!",
        })
      );

      navigate("/");
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message: error?.data?.message || "Đăng nhập Facebook thất bại",
        })
      );
    }
  };

  return (
    <FacebookLogin
      appId={import.meta.env.VITE_FACEBOOK_APP_ID}
      onSuccess={handleFacebookLogin}
      onFail={(error) => {
        console.log("Facebook Login Failed:", error);
        dispatch(
          openSnackbar({
            type: "error",
            message: "Đăng nhập Facebook thất bại",
          })
        );
      }}
      render={({ onClick }) => (
        <div
          onClick={onClick}
          className="relative flex rounded-lg hover:shadow-md transition-all duration-200 items-center justify-center gap-6 px-2 py-3 uppercase border cursor-pointer border-primary-300"
        >
          <div className="text-[24px] absolute left-[80px] text-blue-600">
            <FaFacebook />
          </div>
          <span className="font-semibold opacity-50 capitalize">
            Sign In with Facebook
          </span>
        </div>
      )}
    />
  );
};

export default FacebookLoginButton;
