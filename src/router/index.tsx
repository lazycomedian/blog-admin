import Login from "@/pages/login";
import { RouteObject, useRoutes } from "react-router-dom";

const routeConfig: RouteObject[] = [{ path: "/", element: <Login /> }];

const BasicRouter = () => useRoutes(routeConfig);

export default BasicRouter;
