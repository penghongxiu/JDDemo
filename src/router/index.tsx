import React, { memo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "src/page/index";


export const routerConfig = [];

const router = createBrowserRouter([
    {
        path: '/', //首页
        element: <Index />
    }

])


function RoutesRouter() {
    return <RouterProvider router={router} />
}

export default memo(RoutesRouter);
