import { LoadingPage } from "@components/loadings";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const CollectionLayout = () => {
  return (
    <div className="pt-[100px]">
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default CollectionLayout;
