import { Card, Space } from "antd";
import React, { memo } from "react";
import styled from "styled-components";

interface PageCardProps extends React.PropsWithChildren {}

const PageCard: React.FC<PageCardProps> = ({ children }) => {
  return (
    <Wrapper>
      <Card bordered={false}>
        <Space size="large" direction="vertical">
          {children}
        </Space>
      </Card>
    </Wrapper>
  );
};

export default memo(PageCard);

const Wrapper = styled.div`
  margin-top: 16px;
  overflow: hidden;

  .ant-card {
    box-shadow: none;
  }
`;
