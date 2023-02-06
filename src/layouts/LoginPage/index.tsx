import login_bg from "@/assets/svgs/login_bg.svg";
import { useAppTitle } from "@/hooks";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import styled from "styled-components";
import logo from "/octocat_white.svg";

const LoginPage: React.FC = () => {
  const [form] = Form.useForm<{ username: string; password: string }>();

  useAppTitle("登录");

  return (
    <Wrapper>
      <Row className="container">
        <Col span={13}>
          <div className="left">
            <span>WELCOME</span>
            <img src={logo} alt="" />
          </div>
        </Col>
        <Col span={11}>
          <div className="login-form">
            <div className="login-logo">
              <span className="logo-text">LOGIN</span>
            </div>
            <Form form={form} name="basic" labelCol={{ span: 5 }} onFinish={e => {}} size="large" autoComplete="off">
              <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
                <Input placeholder="用户名" allowClear prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
                <Input.Password autoComplete="new-password" allowClear placeholder="密码" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item style={{ marginTop: 30 }}>
                <Button type="primary" className="login_button" htmlType="submit" block>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default LoginPage;

export const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
  /* background-color: #fff; */
  position: relative;
  height: 100%;
  min-height: 500px;
  background-image: url(${login_bg});
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    background-color: hsl(0deg 0% 100% / 80%);
    box-shadow: 0px 2px 6px rgb(0 0 0 / 20%);
    box-sizing: border-box;
    min-width: 500px;
    overflow: hidden;
    border-radius: 10px;
    width: 80%;
    max-width: 1000px;

    .login_button {
      background-color: #609ff1;
      &:hover {
        background-color: #609ff1d8;
      }
      &:active {
        background-color: #436ea7;
      }
    }

    .left {
      /* background-color: #a5b2f9c5; */
      background-color: #609ff19f;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      span {
        font-weight: 600;
        font-size: 50px;
        color: #fff;
      }

      img {
        width: 100px;
        margin-top: 10px;
      }
    }

    .login-form {
      padding: 60px 10% 20px;
      .login-logo {
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        padding: 10px 0;
        .logo-text {
          color: #609ff1bf;
          font-size: 40px;
          font-weight: bold;
          white-space: nowrap;
        }
      }
      .ant-form-item {
        height: 75px;
        margin-bottom: 0;
        .ant-input-prefix {
          margin-right: 10px;
        }
        .ant-input-affix-wrapper-lg {
          padding: 8.3px 11px;
        }
        .ant-input-affix-wrapper,
        .ant-input-lg {
          font-size: 14px;
        }
        .ant-input-affix-wrapper {
          color: #bfbfbf;
        }
      }
    }
  }
`;
