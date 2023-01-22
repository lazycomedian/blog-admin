import notFoundSvg from "@/assets/svgs/404.svg";
import { CommonRouteEnum } from "@/enums";
import { useAppTitle } from "@/hooks";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useAppTitle("404");

  return (
    <Wrapper>
      <div className="left">
        <img className="image" src={notFoundSvg} alt="" />
      </div>

      <div className="right">
        <h1>404</h1>
        <div className="content">抱歉，你访问的页面不存在</div>
        <Button type="primary" size="large" onClick={() => navigate(CommonRouteEnum.HOME)}>
          返回主页
        </Button>
      </div>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  padding-bottom: 20%;

  .left {
    padding-right: 152px;
    .image {
      max-width: 430px;
      height: 360px;
    }
  }

  .right {
    h1 {
      font-weight: 600;
      font-size: 72px;
      margin-bottom: 24px;
      color: #515a6e;
    }
    .content {
      font-size: 20px;
      margin-bottom: 16px;
      font-weight: 400;
      color: #808695;
    }
  }
`;
