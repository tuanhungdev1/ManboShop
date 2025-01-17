import ButtonBackToTop from "@components/buttons/ButtonBackToTop";
import { Backdrop } from "@components/common/backdrop";
import { Footer } from "@components/common/footers";
import { Header, TopHeader } from "@components/common/headers";

import LoadingPage from "@components/loadings/LoadingPage";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { closeSnackbar } from "@redux/slices/snackbarSlice";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const dispatch = useAppDispatch();

  const { open, message, type } = useAppSelector((state) => state.snackbar);

  return (
    <div>
      <div className="fixed z-50 w-screen">
        <TopHeader />
        <Header />
      </div>

      <div className="pt-[140px] pb-[100px]">
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <ButtonBackToTop />
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={4000}
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
