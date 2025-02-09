import { LoadingPage } from "@components/loadings";
import { useAppDispatch } from "@redux/hooks";
import { saveUser } from "@redux/slices/authSlice";
import { useGetUserQuery } from "@services/userApi";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { data, error, isLoading, isSuccess } = useGetUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveUser(data));
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading) return <LoadingPage />;
  if (error) return <Navigate to={"/account/login"} />;
  return (
    <div className="pt-[100px] container mx-auto px-4">
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
