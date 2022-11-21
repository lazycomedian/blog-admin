import loginLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.png";
import SwitchDark from "@/components/SwitchDark";
import { LoginService } from "@/service/api/login";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Form, Input } from "antd";
import React from "react";
import { Wrapper } from "./styled";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginForm>();

  /**
   * 登录
   */
  const { loading, run: login } = useRequest(
    async (v: LoginForm) => {
      console.log(v);
      LoginService.login();
    },
    { manual: true }
  );

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
            onFinish={login}
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
              <Button type="primary" htmlType="submit" block loading={loading} icon={<UserOutlined />}>
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
