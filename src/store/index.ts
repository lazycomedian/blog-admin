import React from "react";
import { ThemeStore } from "./theme";
import { UserStore } from "./user";

/**
 * 装配所有状态仓库
 */
const store = {
  themeStore: new ThemeStore(),
  userStore: new UserStore()
};

const storeContext = React.createContext(store);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return React.createElement(storeContext.Provider, { value: store }, children);
};

export const useStore = () => React.useContext(storeContext);
