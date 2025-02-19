// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ThemeProvider } from "@mui/material";
import theme from "@configs/muiConfig";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoad } from "@components/common/wrapper";

// Lazy load components
const RootLayout = LazyLoad(() => import("@pages/RootLayout"));
const HomePage = LazyLoad(() => import("@pages/HomePage"));
const BlogPage = LazyLoad(() => import("@pages/BlogPage"));
const ContactPage = LazyLoad(() => import("@pages/ContactPage"));
const RegisterPage = LazyLoad(() => import("@pages/auth/RegisterPage"));
const LoginPage = LazyLoad(() => import("@pages/auth/LoginPage"));
const AuthLayout = LazyLoad(() => import("@pages/auth/AuthLayout"));
const CollectionLayout = LazyLoad(
  () => import("@pages/collection/CollectionLayout")
);
const CollectionDetail = LazyLoad(
  () => import("@pages/collection/CollectionDetail")
);
const ProductDetail = LazyLoad(() => import("@pages/products/ProductDetail"));
const UserProtectedLayout = LazyLoad(
  () => import("@pages/user/UserProtectedLayout")
);
const PersonalInformationPage = LazyLoad(
  () => import("@pages/user/PersonalInformationPage")
);
const OrderPage = LazyLoad(() => import("@pages/user/OrderPage"));
const WishlistPage = LazyLoad(() => import("@pages/user/WishlistPage"));
const SaveCardPage = LazyLoad(() => import("@pages/user/SaveCardPage"));
const NotificationPage = LazyLoad(() => import("@pages/user/NotificationPage"));
const SettingPage = LazyLoad(() => import("@pages/user/SettingPage"));
const AddressPage = LazyLoad(() => import("@pages/user/AddressPage"));
const ProtectedLayout = LazyLoad(
  () => import("@pages/shoppingCart/ProtectedLayout")
);
const ShoppingCartPage = LazyLoad(
  () => import("@pages/shoppingCart/ShoppingCartPage")
);
const CheckoutGuard = LazyLoad(() => import("@pages/checkout/CheckoutGuard"));
const CheckoutLayout = LazyLoad(() => import("@pages/checkout/CheckoutLayout"));
const CheckoutAddress = LazyLoad(
  () => import("@pages/checkout/CheckoutAddress")
);
const CheckoutPayment = LazyLoad(
  () => import("@pages/checkout/CheckoutPayment")
);
const CheckoutPreview = LazyLoad(
  () => import("@pages/checkout/CheckoutPreview")
);
const LoginAdminPage = LazyLoad(
  () => import("@pages/admin/auth/LoginAdminPage")
);
const ProtectedAdminLayout = LazyLoad(
  () => import("@pages/admin/ProtectedAdminLayout")
);
const AdminLayout = LazyLoad(() => import("@pages/admin/AdminLayout"));
const AdminDashboard = LazyLoad(() => import("@pages/admin/AdminDashboard"));
const AdminProducts = LazyLoad(() => import("@pages/admin/AdminProducts"));
const AdminOrders = LazyLoad(() => import("@pages/admin/AdminOrders"));
const AdminCustomers = LazyLoad(() => import("@pages/admin/AdminCustomers"));
const AdminReviews = LazyLoad(() => import("@pages/admin/AdminReviews"));
const AdminPosts = LazyLoad(() => import("@pages/admin/AdminPosts"));
const AdminCoupons = LazyLoad(() => import("@pages/admin/AdminCoupons"));
const AdminBrands = LazyLoad(() => import("@pages/admin/AdminBrands"));
const AdminCategories = LazyLoad(() => import("@pages/admin/AdminCategories"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
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
      {
        path: "brands",
        element: <AdminBrands />,
      },
      {
        path: "categories",
        element: <AdminCategories />,
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
