import loginLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.png";
import login_bg from "@/assets/svgs/login_bg.svg";
import SwitchDark from "@/components/SwitchDark";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import styled from "styled-components";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginForm>();

  return (
    <Wrapper className="login-container">
      <SwitchDark className="dark" />
      <div className="login-box">
        <div className="login-left">
          <img src={loginLeft} alt="login" />
        </div>
        <div className="login-form">
          <div className="login-logo">
            <img className="login-icon" src={logo} alt="logo" />
            <span className="logo-text">Welcome Admin</span>
          </div>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            initialValues={{ remember: true }}
            onFinish={e => {}}
            size="large"
            autoComplete="off"
          >
            <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
              <Input placeholder="用户名" allowClear prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
              <Input.Password autoComplete="new-password" allowClear placeholder="密码" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item style={{ marginTop: 30 }}>
              <Button type="primary" htmlType="submit" block icon={<UserOutlined />}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 550px;
  height: 100%;
  min-height: 500px;
  background-image: url(${login_bg});
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;

  .dark {
    position: absolute;
    top: 5%;
    right: 3.2%;
  }

  .login-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96%;
    height: 94%;
    padding: 0 4% 0 20px;
    overflow: hidden;
    border-radius: 10px;
    .login-left {
      width: 750px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-form {
      padding: 40px 45px 25px;
      border-radius: 10px;
      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
        padding: 10px 0;
        .login-icon {
          width: 70px;
        }
        .logo-text {
          padding-left: 25px;
          font-size: 48px;
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
      .login-btn {
        width: 100%;
        margin-top: 10px;
        white-space: nowrap;
        .ant-form-item-control-input-content {
          display: flex;
          justify-content: space-between;
          .ant-btn {
            width: 180px;
            span {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
`;
