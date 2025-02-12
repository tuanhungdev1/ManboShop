import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  type = "submit",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`bg-black rounded-[6px] flex items-center justify-center h-[54px] text-white hover:text-white cursor-pointer font-medium transition-all duration-200 text-sm w-[300px] ${className} ${
        disabled || loading
          ? "cursor-not-allowed text-white"
          : "hover:text-white hover:shadow-lg"
      }`}
    >
      {loading && (
        <span className="animate-spin mr-2 border-2 border-t-transparent border-white rounded-full w-4 h-4"></span>
      )}
      {children}
    </button>
  );
};

export default ButtonComponent;
