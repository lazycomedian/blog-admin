import ReactDOM from "react-dom/client";
import { StoreProvider } from "./store";
import { GlobalStyle } from "./theme";

// antd
import "antd/dist/reset.css";
import App from "./App";
import { APPLICATION_ELEMENT_ID } from "./constants";
import AntdConfigProvider from "./theme/AntdConfigProvider";

ReactDOM.createRoot(document.getElementById(APPLICATION_ELEMENT_ID)!).render(
  <StoreProvider>
    <AntdConfigProvider>
      <App />

      {/* 全局样式 */}
      <GlobalStyle />
    </AntdConfigProvider>
  </StoreProvider>
);
