import ButtonBackToTop from "@components/buttons/ButtonBackToTop";
import { Backdrop } from "@components/common/backdrop";
import Features from "@components/common/features/Features";
import { Footer } from "@components/common/footers";
import { Header } from "@components/common/headers";

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
        <Header />
      </div>

      <div className="pt-[100px] pb-[100px] container mx-auto px-4">
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
