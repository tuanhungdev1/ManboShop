import { useGetUserQuery } from "@services/userApi";
import UserLayout from "./UserLayout";
import { LoadingPage } from "@components/loadings";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@redux/hooks";
import { saveUser } from "@redux/slices/authSlice";

const UserProtectedLayout = () => {
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
    <div>
      <UserLayout />
    </div>
  );
};

export default UserProtectedLayout;
