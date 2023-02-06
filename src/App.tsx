import _ from "lodash";
import React, { useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import BasicRouter from "./router";
import { useStore } from "./store";

const RouterMode = __ISDEV__ ? BrowserRouter : HashRouter;

const App: React.FC = () => {
  const { userStore } = useStore();

  useEffect(() => {
    if (__ISDEV__) window._ = _;
    userStore.updateUserMenu();
  }, []);

  return (
    <RouterMode>
      <BasicRouter />
    </RouterMode>
  );
};

export default App;
