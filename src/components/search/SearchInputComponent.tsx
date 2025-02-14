import { useState, InputHTMLAttributes, ReactNode } from "react";

interface SearchInputComponentProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  icon?: ReactNode;
  containerClassName?: string;
  onSeachClick?: () => void;
}

export default function SearchInputComponent({
  placeholder = "Search...",
  icon,
  containerClassName = "",
  onSeachClick,
  ...props
}: SearchInputComponentProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-stretch border-[2px] select-none rounded-lg overflow-hidden transition-all ${
        isFocused ? "border-black" : "border-gray-300"
      } ${containerClassName}`}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="border-none h-[50px] w-full pl-4 outline-none flex-1 text-sm"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value.length > 0)}
        {...props}
      />
      {icon && (
        <div
          className="text-3xl w-[70px] cursor-pointer flex items-center justify-center"
          onClick={onSeachClick}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
