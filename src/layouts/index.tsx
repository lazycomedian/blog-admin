import { Card, Layout } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";

const BasicLayout: React.FC = props => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Wrapper>
      <Layout className="i-layout">
        <Layout.Sider trigger={null} className="i-sider" collapsible collapsed={collapsed}>
          <div className="logo">Cinema</div>
          <Menu />
        </Layout.Sider>
        <Layout className="site-layout">
          <Header collapsed={collapsed} onTriggerClick={() => setCollapsed(prev => !prev)} />

          <Layout.Content className="content">
            {/* 路由占位 */}
            <Card className="content-card">
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
    padding: 24px 16px;
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
  }

  .ant-menu {
    background: transparent;
  }

  .logo {
    height: 64px;
    background: transparent;
    font-size: 20px;
    color: #ffffffa6;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 24px;
    }
  }
`;