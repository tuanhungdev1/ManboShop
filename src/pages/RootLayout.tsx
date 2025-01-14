import ButtonBackToTop from "@components/buttons/ButtonBackToTop";
import { Footer } from "@components/common/footers";
import { Header, TopHeader } from "@components/common/headers";
import { AnnouncementMarquee } from "@components/common/menus";
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
    <>
      <TopHeader />
      <Header />
      <AnnouncementMarquee />
      <div className="px-4">
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <ButtonBackToTop />
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => dispatch(closeSnackbar())}
      >
        <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RootLayout;
