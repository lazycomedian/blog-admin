import { LoginController } from "@/service/api/login";
import { QqOutlined, WechatOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Divider, message } from "antd";
import React from "react";
import { LoginWrapper } from "./styled";

const Login: React.FC = props => {
  const { data, run: login } = useRequest(LoginController.login, {
    manual: true,
    onError: e => message.error(e.message),
    onSuccess: data => message.success("登录成功")
  });

  if (1) return <button onClick={() => login({ userName: "a", password: "1" })}>1</button>;

  return (
    <LoginWrapper>
      <div className="content">
        <div className="login-wrapper">
          <h1>登录</h1>
          <div className="login-form">
            <div className="username form-item">
              <span>使用邮箱或者手机号</span>
              <input type="text" className="input-item" />
            </div>
            <div className="password form-item">
              <span>密码</span>
              <input type="password" className="input-item" />
            </div>
            <Button className="login-btn" type="primary">
              登录
            </Button>
          </div>
          <Divider className="i-divider">其他方式登录</Divider>

          <div className="other-login-wrapper">
            <Button className="i-icon-button" icon={<QqOutlined />}></Button>
            <Button className="i-icon-button" icon={<WechatOutlined />}></Button>
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Login;
