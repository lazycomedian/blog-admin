import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * 获取当前路由
 */
export const usePathname = () => {
  const location = useLocation();

  return useMemo(() => {
    return location.pathname.includes("?") ? location.pathname.split("?")[0] : location.pathname;
  }, [location.pathname]);
};
