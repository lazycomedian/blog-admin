import { useStore } from "@/store";
import { useTitle } from "ahooks";
import { useEffect, useMemo } from "react";
import { Location, useLocation } from "react-router-dom";

const { VITE_APP_TITLE } = import.meta.env;

/**
 * 设置浏览器文档标题
 * @param title 设置的文档标题，不传入则从用户菜单获取当前标题
 */
export const useAppTitle = (title?: string) => {
  const { userStore } = useStore();
  const openMenu = useRouteMenuObject();

  const appTitle = useMemo(() => {
    if (title) return `${title} - ${VITE_APP_TITLE}`;
    return openMenu?.name ? `${openMenu.name} - ${VITE_APP_TITLE}` : VITE_APP_TITLE;
  }, [title, openMenu]);

  useEffect(() => {
    if (openMenu?.name) userStore.setLayoutTitle(openMenu?.name);
  }, [appTitle]);

  useTitle(appTitle, { restoreOnUnmount: true });
};

/**
 * 获取当前路由
 */
export const usePathname = () => {
  const location = useLocation();

  return useMemo(() => {
    return location.pathname.includes("?") ? location.pathname.split("?")[0] : location.pathname;
  }, [location.pathname]);
};

/**
 * 获取当前路由菜单项数据对象
 */
export const useRouteMenuObject = () => {
  const { userStore } = useStore();

  const pathname = usePathname();
  return useMemo(() => userStore.flattenUserMenu.find(item => item.path === pathname), [pathname]);
};

/**
 * 监听路由变化
 * @param callback
 */
export const useBeforeEach = (callback: (location: Location) => void) => {
  const location = useLocation();

  useEffect(() => {
    callback(location);
  }, [location]);
};
