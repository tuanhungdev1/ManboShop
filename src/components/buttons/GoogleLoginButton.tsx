import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  return (
    <div className="relative flex items-center justify-center gap-6 px-2 py-3 uppercase border cursor-pointer border-primary-300">
      <div className="text-[24px] absolute left-[80px]">
        <FcGoogle />
      </div>
      <span className="font-semibold opacity-50">ĐĂNG NHẬP GOOGLE</span>
    </div>
  );
};

export default GoogleLoginButton;
