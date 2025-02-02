import { cn } from "@utils/cn";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface StarProps {
  filled: boolean;
  halfFilled: boolean;
  size?: "default" | "small" | "large";
  color?: string;
}

const Star: React.FC<StarProps> = ({
  filled,
  halfFilled,
  size = "default",
  color = "text-primary-500",
}) => {
  if (filled) {
    return (
      <FaStar
        className={cn(
          {
            "text-4xl": size === "large",
            "text-xl": size === "default",
            "text-sm": size === "small",
          },
          color
        )}
      />
    );
  } else if (halfFilled) {
    return (
      <FaStarHalfAlt
        className={cn(
          {
            "text-4xl": size === "large",
            "text-xl": size === "default",
            "text-sm": size === "small",
          },
          color
        )}
      />
    );
  } else {
    return (
      <FaRegStar
        className={cn(
          {
            "text-4xl": size === "large",
            "text-xl": size === "default",
            "text-sm": size === "small",
          },
          color
        )}
      />
    );
  }
};

export default Star;
