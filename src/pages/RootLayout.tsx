import LoadingPage from "@components/loadings/LoadingPage";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default RootLayout;
