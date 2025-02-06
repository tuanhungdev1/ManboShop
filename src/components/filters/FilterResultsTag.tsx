import { CgClose } from "react-icons/cg";
import { SORT_OPTIONS } from "./ProductSort";

interface FilterResultsTagProp {
  label?: string;
  data:
    | string[]
    | { min: number; max: number }
    | { sortBy: string }
    | { searchTerm: string };
  onClose?: () => void;
}

const FilterResultsTag: React.FC<FilterResultsTagProp> = ({
  data,
  label,
  onClose,
}) => {
  let displayText = "";

  if (Array.isArray(data)) {
    displayText = `${label ?? ""} ${data.join(", ")}`;
  } else if ("min" in data && "max" in data) {
    displayText = `Giá: ${data.min.toLocaleString(
      "vi-VN"
    )} - ${data.max.toLocaleString("vi-VN")} VND`;
  } else if ("sortBy" in data) {
    const sort = SORT_OPTIONS.find((item) => item.id === data.sortBy);
    displayText = `Sắp xếp: ${sort?.label}`;
  } else if ("searchTerm" in data) {
    displayText = `Tìm kiếm: ${data.searchTerm}`;
  }

  return (
    <div className="flex select-none border bg-gray-100 py-3 px-4 items-center gap-4 text-[14px] font-semibold">
      <span className="text-wrap">{displayText}</span>
      <div className="text-[20px] cursor-pointer" onClick={onClose}>
        <CgClose />
      </div>
    </div>
  );
};

export default FilterResultsTag;
