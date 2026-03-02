import React, { memo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "src/component/Layout";
import Index from "src/page/index";


export const routerConfig = [];

const router = createBrowserRouter([
    {
        // path: '/',
        element: <Layout />,
        children: [
            {
                path: '/chat/guide',
                element: <Index />
            },
        ]
    },
    {
        path: '/', //首页
        element: <Index />
    }

])


function RoutesRouter() {
    return <RouterProvider router={router} />
}

export default memo(RoutesRouter);
