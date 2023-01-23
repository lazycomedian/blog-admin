import Iconfont from "@/components/Iconfont";
import { APPLICATION_ELEMENT_ID } from "@/constants";
import { CommonRouteEnum } from "@/enums";
import {
  CompressOutlined,
  ExpandOutlined,
  ExportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useFullscreen } from "ahooks";
import { Dropdown, MenuProps, Modal } from "antd";
import React, { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Breadcrumb from "../Breadcrumb";

interface LayoutHeaderProps {
  collapsed: boolean;
  onTriggerClick?: () => void;
  onReload?: () => void;
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ collapsed, onTriggerClick, onReload }) => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.getElementById(APPLICATION_ELEMENT_ID));

  const navigate = useNavigate();

  const dropdownMenu = useMemo<MenuProps>(() => {
    return {
      onClick: e => {
        switch (e.key) {
          case "user_center":
            navigate(CommonRouteEnum.USER_CENTER);
            break;
          case "logout":
            Modal.confirm({
              title: "退出登录确认",
              content: "您确定退出登录当前账户吗？打开的标签页和个人设置将会保存。",
              cancelButtonProps: { type: "text" },
              onOk: close => {
                close();
              },
              type: "warning"
            });
            break;
        }
      },
      items: [
        { key: "user_center", label: "个人中心", icon: <UserOutlined style={{ fontSize: 16 }} /> },
        { type: "divider" },
        { key: "logout", label: "退出登录", icon: <ExportOutlined style={{ fontSize: 16 }} /> }
      ]
    };
  }, []);

  return (
    <Wrapper>
      <header className="i-header">
        {/* 展开/收起菜单 */}
        <ItemButton onClick={onTriggerClick}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            style: { fontSize: 16 }
          })}
        </ItemButton>
        {/* 刷新页面 */}
        <ItemButton onClick={onReload}>
          {/* <ReloadOutlined /> */}
          <Iconfont type="sentimental-reload" fontSize={16} rotate={40} />
        </ItemButton>

        {/* 面包屑 */}
        <Breadcrumb className="ml10" />

        <div className="right">
          {/* 全屏 */}
          <ItemButton style={{ fontSize: 16 }} onClick={toggleFullscreen}>
            {React.createElement(isFullscreen ? CompressOutlined : ExpandOutlined)}
          </ItemButton>
          {/* 登录用户 */}
          <Dropdown menu={dropdownMenu} trigger={["click"]}>
            <ItemButton>
              <span className="login_user">admin</span>
            </ItemButton>
          </Dropdown>
        </div>
      </header>
    </Wrapper>
  );
};

export default memo(LayoutHeader);

const ItemButton = styled.div`
  height: 64px;
  padding: 0 12px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;
  display: flex;
  color: #515a6e;
  font-size: 15px;
  align-items: center;
  &:hover {
    background: #f8f8f9;
  }
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 6;
  .i-header {
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }

  .login_user {
    font-size: 12px;
    margin-left: 12px;
  }

  .trigger {
    font-size: 18px;
  }
`;
