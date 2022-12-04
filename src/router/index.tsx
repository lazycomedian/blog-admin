import BasicLayout from "@/layouts";
import Home from "@/pages/home";
import Login from "@/pages/login";
import { RouteObject, useRoutes } from "react-router-dom";

const files = import.meta.glob("@/pages/**/index.tsx", { eager: true });
console.log(files);

const routeConfig: RouteObject[] = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
        children: [{ path: "/home/test", element: <div>123</div> }]
      }
    ]
  }
];

const BasicRouter = () => {
  return useRoutes(routeConfig);
};

export default BasicRouter;
