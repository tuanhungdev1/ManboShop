/* eslint-disable react-refresh/only-export-components */
import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { ThemeProvider } from "@mui/material";
import theme from "@configs/muiConfig";
import RootLayout from "@pages/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "@pages/auth/AuthLayout";
import RegisterPage from "@pages/auth/RegisterPage";
import LoginPage from "@pages/auth/LoginPage";

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
        element: <AuthLayout />,
        children: [
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
