import { CgClose } from "react-icons/cg";

interface FilterResultsTagProp {
  data: string[] | { min: number; max: number } | { sortBy: string };
  onClose?: () => void;
}

const FilterResultsTag: React.FC<FilterResultsTagProp> = ({
  data,
  onClose,
}) => {
  let displayText = "";

  if (Array.isArray(data)) {
    displayText = data.join(", ");
  } else if ("min" in data && "max" in data) {
    displayText = `Giá: ${data.min.toLocaleString(
      "vi-VN"
    )} - ${data.max.toLocaleString("vi-VN")} VND`;
  } else if ("sortBy" in data) {
    displayText = `Sắp xếp: ${data.sortBy}`;
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
