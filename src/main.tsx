import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import BasicRouter from "./router";
import { StoreProvider } from "./store";
import { GlobalStyle } from "./theme";

// antd
import "antd/dist/reset.css";
import AntdConfigProvider from "./theme/AntdConfigProvider";

const RouterMode = __ISDEV__ ? BrowserRouter : HashRouter;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <AntdConfigProvider>
      {/* 路由 */}
      <RouterMode>
        <BasicRouter />
      </RouterMode>

      {/* 全局样式 */}
      <GlobalStyle />
    </AntdConfigProvider>
  </StoreProvider>
);
