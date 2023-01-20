import BasicLayout from "@/layouts";
import NotFound from "@/layouts/ErrorPage/404";
import Login from "@/pages/login";
import { useStore } from "@/store";
import { useMemo } from "react";
import { useRoutes } from "react-router-dom";

export default function BasicRouter() {
  const { userStore } = useStore();

  const routeConfig = useMemo(() => {
    return [
      { path: "/login", element: <Login /> },
      {
        path: "/",
        element: <BasicLayout />,
        children: userStore.menuRoutes
      },
      { path: "*", element: <NotFound /> }
    ];
  }, [userStore.menuRoutes]);

  return useRoutes(routeConfig);
}
