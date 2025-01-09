import { Footer } from "@components/common/footers";
import { Header, TopHeader } from "@components/common/headers";
import { AnnouncementMarquee } from "@components/common/menus";
import LoadingPage from "@components/loadings/LoadingPage";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <TopHeader />
      <Header />
      <AnnouncementMarquee />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default RootLayout;
