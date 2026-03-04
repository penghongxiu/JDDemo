// src/router/index.tsx
import React, { memo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "src/page/index";
import ProductDetail from "src/page/module/ProductDetail";
import Coupons from "src/page/module/Coupons";  // ✅ 导入优惠券页面

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/coupons", 
    element: <Coupons />,
  },
]);

function RoutesRouter() {
  return <RouterProvider router={router} />
}

export default memo(RoutesRouter);