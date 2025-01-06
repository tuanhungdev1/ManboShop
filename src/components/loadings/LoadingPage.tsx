import usePreventScroll from "@hooks/usePreventScroll";
import { createPortal } from "react-dom";
import { PulseLoader } from "react-spinners";

const LoadingPage = () => {
  usePreventScroll();
  return createPortal(
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center gap-5 -translate-y-20 bg-white">
      <img
        src="https://5sfashion.vn/frontend/assets/images/logo.png"
        alt="Logo We Connect"
        className="w-[100px]"
      />

      <PulseLoader color="#87b9e2" speedMultiplier={0.6} margin={4} />
    </div>,
    document.body
  );
};

export default LoadingPage;
