import { LoadingFallback, LoadingProgress } from "@components/loadings";
import { lazy, Suspense, useState, useEffect } from "react";

export default function lazyLoad(importFunc: () => Promise<{ default: any }>) {
  const LazyComponent = lazy(importFunc);

  return function LazyWrapper(props: any) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => {
        clearTimeout(timer);
        setIsLoading(false);
      };
    }, []);

    return (
      <>
        <LoadingProgress isAnimating={isLoading} />
        <Suspense fallback={<LoadingFallback />}>
          <LazyComponent {...props} />
        </Suspense>
      </>
    );
  };
}
