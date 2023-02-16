import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React from "react";
import styled from "styled-components";

interface PaginationIconProps {
  isPrev?: boolean;
  disabled?: boolean;
}

const PaginationIcon: React.FC<PaginationIconProps> = ({ isPrev, disabled }) => {
  return (
    <Wrapper>
      <div className={classNames("ant-pagination-item", { ml4: isPrev, disabled })}>
        {React.createElement(isPrev ? LeftOutlined : RightOutlined)}
      </div>
    </Wrapper>
  );
};

export default PaginationIcon;

const Wrapper = styled.div`
  .ml4 {
    margin-left: 4px;
  }

  .disabled {
    border: 1px solid #dcdee2;

    cursor: not-allowed;
    * {
      color: #ccc;
    }
  }

  .ant-pagination-item {
    margin-right: 0;
  }
`;
