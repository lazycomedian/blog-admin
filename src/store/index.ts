import React from "react";
import { UserStore } from "./UserStore";

const store = <const>{
  userStore: new UserStore()
};

const StoreContext = React.createContext(store);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return React.createElement(StoreContext.Provider, { value: store }, children);
};

export const useStore = () => React.useContext(StoreContext);
