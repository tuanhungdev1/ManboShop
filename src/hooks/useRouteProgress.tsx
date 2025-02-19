import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useRouteProgress() {
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAnimating(true);

    // Giả lập thời gian loading
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [location]);

  return isAnimating;
}
