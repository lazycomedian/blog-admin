import { createGlobalStyle } from "styled-components";
import { overrideToken } from "./AntdConfigProvider";
import { commonClassName } from "./common";
import { overrideAntdCss } from "./override-antd";

export const GlobalStyle = createGlobalStyle`
  body {
    background: #f5f7f9;
  }

  #root {
    height: 100%;
    width: 100%;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei;
    background: #f5f7f9;
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

  .ant-table .ant-table-row>td.expandable{
    width: 10px;
    padding: 0 4px 0 20px !important;
  } 

  .cursor-pointer {
    cursor: pointer;
  }

  .text-nowrap{
    white-space: nowrap;
  }

  ${commonClassName}
  ${overrideAntdCss}
`;
