import { useEffect } from "react";

const usePreventScroll = (shouldPreventScroll: boolean = true) => {
  useEffect(() => {
    if (shouldPreventScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [shouldPreventScroll]);
};

export default usePreventScroll;
