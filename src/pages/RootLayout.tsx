import ButtonBackToTop from "@components/buttons/ButtonBackToTop";
import { Backdrop } from "@components/common/backdrop";
import Features from "@components/common/features/Features";
import { Footer } from "@components/common/footers";
import { Header } from "@components/common/headers";
import { CartProvider } from "@components/common/providers";

import LoadingPage from "@components/loadings/LoadingPage";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { saveUser, selectAccessToken } from "@redux/slices/authSlice";

import { closeSnackbar } from "@redux/slices/snackbarSlice";
import { useGetUserQuery } from "@services/userApi";
import { authStorage } from "@utils/authStorage";

import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const accessToken =
    useAppSelector(selectAccessToken) ?? authStorage.getAccessToken();
  const { data, isLoading, isSuccess, refetch } = useGetUserQuery(undefined, {
    skip: !accessToken,
  });
  const [showLoading, setShowLoading] = useState(true);
  const { open, message, type } = useAppSelector((state) => state.snackbar);

  useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken]);
  useEffect(() => {
    if (isSuccess && data) {
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

  return (
    <div className="overflow-hidden">
      <div className="fixed z-50 w-screen">
        <CartProvider>
          <Header />
        </CartProvider>
      </div>

      <div className="pb-[100px]">
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </div>
      <Features />
      <Footer />
      <ButtonBackToTop />
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => dispatch(closeSnackbar())}
        >
          <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
      <Backdrop />
    </div>
  );
};

export default RootLayout;
