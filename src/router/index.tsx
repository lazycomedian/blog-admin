import { StorageKeyEnum } from "@/constants/storage";
import BasicLayout from "@/layouts";
import Home from "@/pages/home";
import Login from "@/pages/login";
import RoleManagement from "@/pages/settings/RoleManagement";
import UserManagement from "@/pages/settings/UserManagement";
import { storage } from "@/utils";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

const files = import.meta.glob("@/pages/**/index.tsx", { eager: true });
console.log(files);

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
            path: "/settings/role-management",
            element: <RoleManagement />
          },
          {
            path: "/settings/user-management",
            element: <UserManagement />
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
