import { useStore } from "@/store";
import { useTitle } from "ahooks";
import { useEffect, useMemo } from "react";
import { usePathname } from "./usePathname";

const { VITE_APP_TITLE } = import.meta.env;

/**
 * 设置浏览器文档标题
 * @param title 设置的文档标题，不传入则从用户菜单获取当前标题
 */
export const useAppTitle = (title?: string) => {
  const pathname = usePathname();
  const { userStore } = useStore();

  const openMenu = useMemo(() => userStore.flattenUserMenu.find(item => item.fullPath === pathname), [pathname]);

  const appTitle = useMemo(() => {
    if (title) return `${title} - ${VITE_APP_TITLE}`;
    return openMenu?.name ? `${openMenu.name} - ${VITE_APP_TITLE}` : VITE_APP_TITLE;
  }, [title, openMenu]);

  useEffect(() => {
    if (openMenu?.name) userStore.setLayoutTitle(openMenu?.name);
  }, [appTitle]);

  useTitle(appTitle, { restoreOnUnmount: true });
};
