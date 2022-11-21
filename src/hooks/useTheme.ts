import darkTheme from "@/assets/styles/theme/theme-dark.less";
import defaultTheme from "@/assets/styles/theme/theme-default.less";
import { useStore } from "@/store";
import { useMemoizedFn } from "ahooks";
import { useEffect } from "react";

/**
 *  全局主题设置
 *
 */
export const useTheme = () => {
  const { themeStore } = useStore();

  const initTheme = useMemoizedFn(() => {
    const isGray = themeStore.isGaryMode;
    const isWeak = themeStore.isWeakMode;

    // 灰色和弱色切换
    const body = document.body;
    if (isGray && isWeak) {
      body.setAttribute("style", "filter: grayscale(1) invert(80%)");
    } else if (isGray) {
      body.setAttribute("style", "filter: grayscale(1)");
    } else if (isWeak) {
      body.setAttribute("style", "filter: invert(80%)");
    } else body.setAttribute("style", "");

    // 切换暗黑模式
    let head = document.getElementsByTagName("head")[0];
    const getStyle = head.getElementsByTagName("style");
    for (const styleDom of getStyle) {
      if (styleDom.getAttribute("data-type") === "dark") {
        styleDom.remove();
        break;
      }
    }
    let styleDom = document.createElement("style");
    styleDom.dataset.type = "dark";
    styleDom.innerHTML = themeStore.isDarkMode ? darkTheme : defaultTheme;
    head.appendChild(styleDom);
  });

  useEffect(() => {
    initTheme();
  }, [themeStore.isDarkMode, themeStore.isGaryMode, themeStore.isWeakMode]);

  return initTheme;
};
