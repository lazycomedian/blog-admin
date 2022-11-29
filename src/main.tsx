import ReactDOM from "react-dom/client";
import { StoreProvider } from "./store";

// vite svg注册脚本
import "virtual:svg-icons-register";

// antd
import "antd/dist/reset.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { HashRouter } from "react-router-dom";
import BasicRouter from "./router";
import { GlobalStyle } from "./theme";
import AntdConfigProvider from "./theme/AntdConfigProvider";

dayjs.locale("zh-cn");

const container = document.getElementById("root")!;

ReactDOM.createRoot(container).render(
  <StoreProvider>
    <AntdConfigProvider>
      {/* 路由 */}
      <HashRouter>
        <BasicRouter />
      </HashRouter>

      {/* 全局样式 */}
      <GlobalStyle />
    </AntdConfigProvider>
  </StoreProvider>
);
