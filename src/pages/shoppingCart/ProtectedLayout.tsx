import { LoadingPage } from "@components/loadings";
import { useAppDispatch } from "@redux/hooks";
import { saveUser } from "@redux/slices/authSlice";
import { useGetUserQuery } from "@services/userApi";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { data, error, isLoading, isSuccess } = useGetUserQuery();
  const dispatch = useAppDispatch();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveUser(data));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading || showLoading) return <LoadingPage />;
  if (error) return <Navigate to={"/account/login"} />;
  return (
    <div className="pt-[100px]">
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
