import ButtonBackToTop from "@components/buttons/ButtonBackToTop";
import { ChatboxAi } from "@components/chat";
import { Backdrop } from "@components/common/backdrop";
import Features from "@components/common/features/Features";
import { Footer } from "@components/common/footers";
import { Header } from "@components/common/headers";
import { CartProvider } from "@components/common/providers";

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
      <ChatboxAi />

      {message && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => {
            dispatch(closeSnackbar());
          }}
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
