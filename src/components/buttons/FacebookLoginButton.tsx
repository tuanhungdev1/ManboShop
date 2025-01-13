import { FaFacebook } from "react-icons/fa";

const FacebookLoginButton = () => {
  return (
    <div className="relative flex items-center justify-center gap-6 px-2 py-3 text-white uppercase bg-blue-500 border border-blue-500 cursor-pointer">
      <div className="text-[24px] absolute left-[80px]">
        <FaFacebook />
      </div>
      <span className="font-semibold">ĐĂNG NHẬP FACEBOOK</span>
    </div>
  );
};

export default FacebookLoginButton;
