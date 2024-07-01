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

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  { path: "/product-detail/:id", element: <ProductDetail /> },
  { path: "/edit-product/:id", element: <EditProduct /> },
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
