/* eslint-disable react-refresh/only-export-components */
import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ThemeProvider } from "@mui/material";
import theme from "@configs/muiConfig";
import RootLayout from "@pages/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "@pages/auth/RegisterPage";
import LoginPage from "@pages/auth/LoginPage";
import AuthLayout from "@pages/auth/AuthLayout";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import CollectionLayout from "@pages/collection/CollectionLayout";
import CollectionDetail from "@pages/collection/CollectionDetail";
import ProductDetail from "@pages/products/ProductDetail";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserProtectedLayout from "@pages/user/UserProtectedLayout";
import UserLayout from "@pages/user/UserLayout";
import PersonalInformationPage from "@pages/user/PersonalInformationPage";
import OrderPage from "@pages/user/OrderPage";
import WishlistPage from "@pages/user/WishlistPage";
import SaveCardPage from "@pages/user/SaveCardPage";
import NotificationPage from "@pages/user/NotificationPage";
import SettingPage from "@pages/user/SettingPage";
import AddressPage from "@pages/user/AddressPage";

const HomePage = lazy(() => import("@pages/HomePage"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/product/:slug",
        element: <ProductDetail />,
      },
      {
        element: <CollectionLayout />,
        children: [
          {
            path: "/collection",
            element: <CollectionDetail />,
          },
        ],
      },
      {
        path: "/account",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <UserProtectedLayout />,
        children: [
          {
            path: "/user/profile",
            element: <PersonalInformationPage />,
          },
          {
            path: "/user/wishlists",
            element: <WishlistPage />,
          },
          {
            path: "/user/addresses",
            element: <AddressPage />,
          },
          {
            path: "/user/orders",
            element: <OrderPage />,
          },
          {
            path: "/user/saved-cards",
            element: <SaveCardPage />,
          },
          {
            path: "/user/notifications",
            element: <NotificationPage />,
          },
          {
            path: "/user/settings",
            element: <SettingPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
