import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Layout, Row } from "antd";
import React, { memo } from "react";
import styled from "styled-components";

interface HeaderProps {
  collapsed: boolean;
  onTriggerClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, onTriggerClick }) => {
  return (
    <Wrapper>
      <Layout.Header className="i-header">
        <Row align="middle" gutter={20}>
          <Col>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: onTriggerClick
            })}
          </Col>

          <Col style={{ marginBottom: 3 }}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">Application Center</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">Application List</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Layout.Header>
    </Wrapper>
  );
};

export default memo(Header);

const Wrapper = styled.div`
  .i-header {
    background-color: #fff;
    padding: 0 16px;
  }

  .trigger {
    font-size: 18px;
  }
`;
