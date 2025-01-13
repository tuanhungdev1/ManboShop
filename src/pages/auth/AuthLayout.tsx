import { LoadingPage } from "@components/loadings";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="pb-24">
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AuthLayout;
