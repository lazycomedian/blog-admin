import { ConfigProvider, theme } from "antd";
import { OverrideToken } from "antd/es/theme/interface";
import zhCN from "antd/locale/zh_CN";
import React from "react";

export const overrideToken: OverrideToken = {
  Button: {
    colorPrimary: " rgba(59, 72, 89,1)",
    colorPrimaryHover: "rgba(59, 72, 89,.9)",
    colorPrimaryActive: "rgba(70, 72, 89,1)"
  }
};

const AntdConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider locale={zhCN} theme={{ algorithm: theme.darkAlgorithm, components: overrideToken }}>
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
