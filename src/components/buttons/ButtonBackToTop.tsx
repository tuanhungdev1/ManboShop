import React, { useState, useEffect } from "react";
import { GoArrowUp } from "react-icons/go";
import { cn } from "@utils/cn";

const ButtonBackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInFooter, setIsInFooter] = useState(false);
  const footerHeight = 660; // Chiều cao của footer

  const toggleVisibility = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if (scrollY + windowHeight >= documentHeight - footerHeight) {
      setIsInFooter(true);
    } else {
      setIsInFooter(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-[100px] transition-all duration-100 ease-in-out justify-center flex flex-col items-center gap-2 right-[20px] cursor-pointer bg-transparent",
        isInFooter ? "text-white border-white" : "text-black border-black",
        isVisible ? "opacity-100" : "opacity-0 select-none pointer-events-none"
      )}
      onClick={scrollToTop}
    >
      <div
        className={cn(
          "flex items-center text-[20px] justify-center w-10 h-10 border rounded-full",
          isInFooter ? "border-white" : "border-black"
        )}
      >
        <GoArrowUp />
      </div>
      <span className="uppercase text-[8px] font-medium">back to top</span>
    </div>
  );
};

export default ButtonBackToTop;
