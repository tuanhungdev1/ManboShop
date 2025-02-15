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
import PersonalInformationPage from "@pages/user/PersonalInformationPage";
import OrderPage from "@pages/user/OrderPage";
import WishlistPage from "@pages/user/WishlistPage";
import SaveCardPage from "@pages/user/SaveCardPage";
import NotificationPage from "@pages/user/NotificationPage";
import SettingPage from "@pages/user/SettingPage";
import AddressPage from "@pages/user/AddressPage";
import ProtectedLayout from "@pages/shoppingCart/ProtectedLayout";
import ShoppingCartPage from "@pages/shoppingCart/ShoppingCartPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CheckoutGuard from "@pages/checkout/CheckoutGuard";
import CheckoutLayout from "@pages/checkout/CheckoutLayout";
import CheckoutAddress from "@pages/checkout/CheckoutAddress";
import CheckoutPayment from "@pages/checkout/CheckoutPayment";
import CheckoutPreview from "@pages/checkout/CheckoutPreview";
import LoginAdminPage from "@pages/admin/auth/LoginAdminPage";
import ProtectedAdminLayout from "@pages/admin/ProtectedAdminLayout";
import AdminLayout from "@pages/admin/AdminLayout";
import AdminDashboard from "@pages/admin/AdminDashboard";
import AdminProducts from "@pages/admin/AdminProducts";
import AdminOrders from "@pages/admin/AdminOrders";
import AdminCustomers from "@pages/admin/AdminCustomers";
import AdminReviews from "@pages/admin/AdminReviews";
import AdminPosts from "@pages/admin/AdminPosts";
import AdminCoupons from "@pages/admin/AdminCoupons";

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
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/shopping-cart",
            element: <ShoppingCartPage />,
          },
          {
            path: "/checkout",
            element: (
              <CheckoutGuard>
                <CheckoutLayout />
              </CheckoutGuard>
            ),
            children: [
              {
                path: "address",
                element: <CheckoutAddress />,
              },
              {
                path: "payment",
                element: <CheckoutPayment />,
              },
              {
                path: "preview",
                element: <CheckoutPreview />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/admin-login",
    element: <LoginAdminPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminLayout>
        <AdminLayout />
      </ProtectedAdminLayout>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "customers",
        element: <AdminCustomers />,
      },
      {
        path: "reviews",
        element: <AdminReviews />,
      },
      {
        path: "posts",
        element: <AdminPosts />,
      },
      {
        path: "coupons",
        element: <AdminCoupons />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
