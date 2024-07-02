import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./route-protection/ProtectedRoute";
import OpenRoute from "./route-protection/OpenRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <OpenRoute>
        <Login />
      </OpenRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <OpenRoute>
        <Register />
      </OpenRoute>
    ),
  },
  {
    path: "/add-product",
    element: (
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <ProtectedRoute>
        <ProductDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-product/:id",
    element: (
      <ProtectedRoute>
        <EditProduct />
      </ProtectedRoute>
    ),
  },
]);

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
