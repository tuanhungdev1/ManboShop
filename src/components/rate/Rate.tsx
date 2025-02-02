import { cn } from "@utils/cn";
import Star from "./Star";

interface RateProps {
  numberRate: number;
  size?: "default" | "small" | "large";
  color?: string; //#COLOR CODE
}

const Rate: React.FC<RateProps> = ({ numberRate, color, size }) => {
  const fullStars = Math.floor(numberRate);

  const hasHalfStar = numberRate - fullStars >= 0.5;

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      className={cn("flex items-center", {
        "gap-2": size === "large",
        "gap-1": size === "default",
        "": size === "small",
      })}
    >
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={i}
          filled={true}
          halfFilled={false}
          size={size}
          color={color}
        />
      ))}
      {hasHalfStar && (
        <Star filled={false} halfFilled={true} size={size} color={color} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={i + fullStars + 1}
          filled={false}
          halfFilled={false}
          size={size}
          color={color}
        />
      ))}
    </div>
  );
};

export default Rate;
