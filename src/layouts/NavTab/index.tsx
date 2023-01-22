import Iconfont from "@/components/Iconfont";
import { theme } from "antd";
import React, { memo } from "react";
import { NavTabItem, Wrapper } from "./styled";

interface NavTabProps {
  left: number;
}

const NavTab: React.FC<NavTabProps> = ({ left }) => {
  const { token } = theme.useToken();

  return (
    <Wrapper>
      <div className="float_block" style={{ left, width: `calc(100% - ${left}px)` }}>
        <div className="nav_tab_main">
          <div className="nav_tab_control prev">
            <Iconfont type="sentimental-down" rotate={90} color={token.colorText} />
          </div>
          <div className="nav_tab_control next">
            <Iconfont type="sentimental-down" rotate={270} color={token.colorText} />
          </div>
          <div className="nav_tab_scroll">
            <div className="nav_tab_content">
              <NavTabItem>主页</NavTabItem>
            </div>
          </div>
        </div>

        <div className="nav_tab_dropdown">
          <Iconfont type="sentimental-down" fontSize={12} color={token.colorText} />
        </div>
      </div>
    </Wrapper>
  );
};

export default memo(NavTab);
