import { createGlobalStyle } from "styled-components";
import { overrideToken } from "./AntdConfigProvider";
import { overrideAntdCss } from "./override-antd";

export const GlobalStyle = createGlobalStyle`
  #root {
    height: 100%;
    width: 100%;
  }

  #nprogress .bar{
    background-color: #2b85e4;
  }

  .i-icon-button {
    border: 1px solid rgb(214, 222, 228);
    background-color: #fff;
    font-size: 20px;
    margin: 10px;
    color: ${overrideToken.Button?.colorPrimary || "unset"};
  }

  .ant-form-item .i-query-select{
    width: 214px !important;
  }

  ${overrideAntdCss}
`;
