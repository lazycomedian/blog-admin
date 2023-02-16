import { LoadingOutlined } from "@ant-design/icons";
import { useUnmount } from "ahooks";
import { Spin } from "antd";
import { SpinIndicator } from "antd/es/spin";
import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface LoadingProps {
  tip?: string;
  loadingDelay?: number;
}

const Loading: React.FC<LoadingProps> = ({ tip, loadingDelay }) => {
  const [content, setContent] = useState<SpinIndicator>(<LoadingOutlined spin />);

  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (loadingDelay) {
      setContent(<span></span>);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setContent(<LoadingOutlined spin />);
      }, loadingDelay);
    }
  }, [loadingDelay]);

  useUnmount(() => clearTimeout(timer.current));

  return (
    <Wrapper>
      <Spin tip={tip} size="large" indicator={content} />
    </Wrapper>
  );
};

export default memo(Loading);

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;
