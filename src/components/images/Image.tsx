import { cn } from "@utils/cn";
import { useEffect, useState } from "react";

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const LoadImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc = "/public/fallbackImage.jpg",
}) => {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setImageSrc(fallbackSrc);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      />
    </div>
  );
};

export default LoadImage;
