import { useStore } from "@/store";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

interface PageHeaderProps {
  title?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { userStore } = useStore();

  return (
    <Wrapper>
      <div className="page_header_content">
        <div className="title">{title || userStore.layoutTitle || import.meta.env.VITE_APP_TITLE}</div>
      </div>
    </Wrapper>
  );
};

export default observer(PageHeader);

const Wrapper = styled.div`
  margin: -16px -24px 0;

  .page_header_content {
    padding: 16px 32px 0 32px;
    background: #fff;
    border-bottom: 1px solid #e8eaec;

    .title {
      display: inline-block;
      color: #17233d;
      font-weight: 500;
      font-size: 20px;
      margin-bottom: 16px;
      line-height: 30px;
      height: 30px;
    }
  }
`;
