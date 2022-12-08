import { StorageKeyEnum } from "@/constants/storage";
import BasicLayout from "@/layouts";
import Home from "@/pages/home";
import Login from "@/pages/login";
import SystemAdmin from "@/pages/settings/SystemAdmin";
import SystemRole from "@/pages/settings/SystemRole";
import { storage } from "@/utils";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

const files = import.meta.glob("@/pages/**/index.tsx", { eager: true });
for (const key in files) {
  console.log(key);
}

const RouteGuard = () => {
  const token = storage.getItem(StorageKeyEnum.token);
  return !token ? <BasicLayout /> : <Navigate to="/login" />;
};

const routeConfig: RouteObject[] = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <RouteGuard />,
    children: [
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "/home/test",
            element: <div>123</div>
          }
        ]
      },
      {
        path: "/settings",
        children: [
          {
            path: "/settings/system_role",
            element: <SystemRole />
          },
          {
            path: "/settings/system_admin",
            element: <SystemAdmin />
          }
        ]
      }
    ]
  }
];

const BasicRouter = () => {
  return useRoutes(routeConfig);
};

export default BasicRouter;
