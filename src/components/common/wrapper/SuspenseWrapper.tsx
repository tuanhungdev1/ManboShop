import { LoadingProgress } from "@components/loadings";
import { Suspense, useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function SuspenseWrapper({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      <LoadingProgress isAnimating={isLoading} />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}
