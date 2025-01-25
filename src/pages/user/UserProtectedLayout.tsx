import { useGetUserQuery } from "@services/userApi";
import UserLayout from "./UserLayout";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "@redux/hooks";
import { saveUser } from "@redux/slices/authSlice";
import { LoadingPage } from "@components/loadings";

const UserProtectedLayout = () => {
  const { data, isLoading, error, isSuccess } = useGetUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveUser(data));
    }
  }, [isSuccess]);

  if (isLoading) {
    return <LoadingPage />;
  }

  console.log(error);

  if (error) {
    console.log(error);
    return <Navigate to={"/account/login"} replace />;
  }

  return (
    <div>
      <UserLayout />
    </div>
  );
};

export default UserProtectedLayout;
