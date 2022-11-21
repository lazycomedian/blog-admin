import { observer } from "mobx-react";
import React from "react";
import { HashRouter } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import BasicRouter from "./router";

const App: React.FC = () => {
  // 全局使用主题
  useTheme();

  return (
    <HashRouter>
      <BasicRouter />
    </HashRouter>
  );
};

export default observer(App);
