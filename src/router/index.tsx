import { CommonRouteEnum } from "@/enums";
import BasicLayout from "@/layouts";
import NotFound from "@/layouts/ErrorPage/404";
import Login from "@/pages/Login";
import { useStore } from "@/store";
import { useMemo } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

export default function BasicRouter() {
  const { userStore } = useStore();

  const routeConfig = useMemo<RouteObject[]>(() => {
    return [
      { path: CommonRouteEnum.LOGIN, element: <Login /> },
      {
        path: "/",
        element: <BasicLayout />,
        children: [
          {
            path: "/",
            element: <Navigate to={CommonRouteEnum.HOME} />
          },
          ...userStore.menuRoutes
        ]
      },
      { path: "*", element: <NotFound /> }
    ];
  }, [userStore.menuRoutes]);

  return useRoutes(routeConfig);
}
