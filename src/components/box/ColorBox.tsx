import { Color } from "@constants/filters/filter";
import { cn } from "@utils/cn";

interface ColorBoxProps {
  color: Color;
  isSelected: boolean;
  onSelectedColorBox: () => void;
  className?: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({
  color,
  isSelected = false,
  className,
  onSelectedColorBox,
}) => {
  return (
    <div
      key={color.id}
      onClick={onSelectedColorBox}
      style={{ backgroundColor: color.code }}
      className={cn(
        `w-5 h-5 rounded-md cursor-pointer `,
        color.code === "#FFFFFF" ? "border-[2px] border-primary-300" : "",

        "hover:outline hover:outline-primary-800 hover:outline-offset-[3px]",

        isSelected && "outline  outline-primary-800 outline-offset-[3px]",
        className
      )}
    ></div>
  );
};

export default ColorBox;
