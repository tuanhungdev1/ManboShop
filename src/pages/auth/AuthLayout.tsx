import { LoadingPage } from "@components/loadings";
import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const { pathname } = location;

  let imageUrl = "";
  switch (pathname) {
    case "/register":
      imageUrl =
        "https://res.cloudinary.com/dphbiiclr/image/upload/v1736162674/5SFASHION/COMMON/img-login-page_roqvys.png";
      break;
    case "/login":
      imageUrl =
        "https://res.cloudinary.com/dphbiiclr/image/upload/v1736162621/5SFASHION/COMMON/img-register-page_dazo3j.png";
      break;
    case "/verify-otp":
      imageUrl =
        "https://res.cloudinary.com/dphbiiclr/image/upload/v1736162956/5SFASHION/COMMON/img-enter-opt-page_gytzjj.png";
      break;
    case "/forgot-password":
      imageUrl =
        "https://res.cloudinary.com/dphbiiclr/image/upload/v1736162953/5SFASHION/COMMON/img-forgot-password-page_o3ktqi.png";
      break;
    default:
      imageUrl =
        "https://res.cloudinary.com/dphbiiclr/image/upload/v1736162621/5SFASHION/COMMON/img-register-page_dazo3j.png"; // Default image or leave it empty
  }
  return (
    <div className="flex items-stretch h-screen select-none">
      <div className="relative flex-1 object-center h-full">
        <img src={imageUrl} alt="Image Page" className="w-full h-full" />
        <div className="absolute top-16 left-16">
          <Link to={"/"}>
            <img
              src="https://5sfashion.vn/frontend/assets/images/logo.png"
              alt="Logo Image"
              className="w-[200px]"
            />
          </Link>
        </div>
      </div>
      <div className="flex-1 h-full">
        <div className="flex items-center h-full pl-24 pr-32">
          <div className="">
            <Suspense fallback={<LoadingPage />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
