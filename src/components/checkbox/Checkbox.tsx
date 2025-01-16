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
        "flex items-center font-medium cursor-pointer select-none text-[13px]",
        classname
      )}
      onClick={onClick}
    >
      {/* Hộp kiểm */}
      <div
        className={cn(
          "flex justify-center items-center w-[20px] h-[20px] border-[1px] transition-colors",
          isChecked
            ? "bg-primary-900 border-primary-900 text-white"
            : "bg-white border-gray-400"
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
