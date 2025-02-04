import { cn } from "@utils/cn";
import { IoMdCheckmark } from "react-icons/io";

interface CheckBoxProps {
  label: string;
  classname?: string;
  onClick: () => void;
  isChecked: boolean;
}

const Checkbox: React.FC<CheckBoxProps> = ({
  label,
  classname,
  onClick,
  isChecked = false,
}) => {
  return (
    <div
      className={cn(
        "group flex items-center font-medium cursor-pointer select-none text-[14px]",
        classname
      )}
      onClick={onClick}
    >
      {/* Hộp kiểm */}
      <div
        className={cn(
          "flex justify-center items-center w-[20px] h-[20px] border-[2px] transition-colors rounded-[4px] border-black",
          isChecked
            ? "bg-primary-900 border-primary-900 text-white"
            : "bg-white border-gray-400 group-hover:border-black" // Border đổi màu khi hover
        )}
      >
        {/* Hiển thị dấu kiểm khi được chọn */}
        {isChecked && <IoMdCheckmark className="text-[16px]" />}
      </div>
      {/* Nhãn */}
      <span className="ml-2">{label}</span>
    </div>
  );
};

export default Checkbox;
