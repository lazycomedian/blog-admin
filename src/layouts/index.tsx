import Iconfont from "@/components/Iconfont";
import { CommonRouteEnum, StorageKeyEnum } from "@/enums";
import { useAppTitle } from "@/hooks";
import { storage } from "@/utils";
import { Layout } from "antd";
import React, { useMemo, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { author, version } from "~/package.json";
import LayoutHeader from "./LayoutHeader";
import LayoutMenu from "./LayoutMenu";
import NavTab from "./NavTab";

const BasicLayout: React.FC = () => {
  if (storage.has(StorageKeyEnum.TOKEN)) return <Navigate to={CommonRouteEnum.LOGIN} />;
  const navigate = useNavigate();

  // 左侧菜单是否收起
  const [collapsed, setCollapsed] = useState(false);

  // 当前路由的唯一key，用于重载页面组件
  const [routeKey, setRouteKey] = useState(Date.now());

  useAppTitle();

  const menuWidth = useMemo<number>(() => (collapsed ? 80 : 200), [collapsed]);

  return (
    <Wrapper>
      <Layout className="i-layout">
        <Layout.Sider trigger={null} className="i-sider" collapsible collapsed={collapsed}>
          <div className="logo" onClick={() => navigate(CommonRouteEnum.HOME)}>
            <Iconfont fontSize={30} type="sentimental-octocat" />
            {/* {!collapsed && <div className="title">{import.meta.env.VITE_APP_TITLE}</div>} */}
          </div>

          {/* 菜单 */}
          <LayoutMenu collapsed={collapsed} />
        </Layout.Sider>

        <Layout className="i-layout-main" style={{ paddingLeft: menuWidth }}>
          <LayoutHeader
            collapsed={collapsed}
            onReload={() => setRouteKey(Date.now())}
            onTriggerClick={() => setCollapsed(prev => !prev)}
          />

          {/* 导航标签页 */}
          <NavTab left={menuWidth} />

          <Layout.Content className="content">
            {/* 路由占位 */}
            <Outlet key={routeKey} />
          </Layout.Content>

          <Layout.Footer className="i-layout-footer">
            Copyright © 2023-{new Date().getFullYear()} {author} | {import.meta.env.VITE_APP_TITLE} v{version}
          </Layout.Footer>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default BasicLayout;

const Wrapper = styled.div`
  overflow: hidden;

  .ant-layout {
    background: transparent;
  }

  .ant-menu-submenu-title:active {
    background: transparent !important;
  }

  .content {
    padding: 16px 24px;
    position: relative;
  }

  .i-layout {
    height: 100%;
  }

  .i-layout-main {
    transition: padding-left 0.2s ease-in-out;
    min-height: 100vh;
  }

  .i-layout-footer {
    text-align: center;
    color: #808695;
    font-weight: 400;
    background: transparent;
  }

  .i-sider {
    background: #191a23;
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
    position: fixed;
    top: 0;
    z-index: 20;
  }

  .logo {
    border-bottom: 1px solid #101117;
    height: 64px;
    background: transparent;
    font-size: 20px;
    color: #ffffffa6;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .octocat {
      font-size: 28px;
      width: 28px;
    }
    .title {
      margin-left: 10px;
    }
  }
`;
