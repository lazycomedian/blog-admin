import { CommonRouteEnum, StorageKeyEnum } from "@/enums";
import { storage } from "@/utils";
import { Card, Layout } from "antd";
import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import octocat from "/octocat.svg";

const BasicLayout: React.FC = () => {
  if (storage.has(StorageKeyEnum.token)) return <Navigate to={CommonRouteEnum.LOGIN} />;

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Wrapper>
      <Layout className="i-layout">
        <Layout.Sider trigger={null} className="i-sider" collapsible collapsed={collapsed}>
          <div className="logo" onClick={() => navigate(CommonRouteEnum.HOME)}>
            <img src={octocat} className="octocat" alt="" />
            {!collapsed && <div className="title">{import.meta.env.VITE_APP_TITLE}</div>}
          </div>

          {/* 菜单 */}
          <Menu />
        </Layout.Sider>

        <Layout className="site-layout">
          <Header collapsed={collapsed} onTriggerClick={() => setCollapsed(prev => !prev)} />

          <Layout.Content className="content">
            {/* 路由占位 */}
            <Card className="content-card" bordered={false}>
              <Outlet />
            </Card>
          </Layout.Content>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default BasicLayout;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .ant-menu-submenu-title:active {
    background: transparent !important;
  }

  .content {
    padding: 16px 16px;
    overflow-y: auto;
    background: #f5f7f9;

    .content-card {
      min-height: 100%;
    }
  }

  .i-layout {
    height: 100%;
  }

  .i-sider {
    background: #191a23;
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  }

  .ant-menu {
    background: transparent;
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
      width: 24px;
    }
    .title {
      margin-left: 10px;
    }
  }
`;
