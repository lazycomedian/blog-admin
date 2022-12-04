import { StorageKeyEnum } from "@/constants/storage";
import { LoginController } from "@/service/api/login";
import { storage } from "@/utils";
import { tips } from "@/utils/tips";
import { QqOutlined, WechatOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Divider, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginWrapper } from "./styled";

const Login: React.FC = props => {
  const navigate = useNavigate();

  const { loading, run: login } = useRequest(LoginController.login, {
    manual: true,
    debounceWait: 300,
    onError: e => tips.error(e.message),
    onSuccess: data => {
      tips.success("登录成功");
      storage.setItem(StorageKeyEnum.token, data.token);
      navigate("/home");
    }
  });

  return (
    <LoginWrapper>
      <div className="content">
        <div className="login-wrapper">
          <h1>登录</h1>

          <Form
            className="login-form"
            layout="vertical"
            onFinish={v => {
              if (!v.username) return tips.warning("请输入用户名");
              if (!v.password) return tips.warning("请输入密码");
              login(v);
            }}
          >
            <Form.Item name="username" className="form-item" label={<span className="label">用户名</span>}>
              <Input className="i-input" />
            </Form.Item>
            <Form.Item name="password" className="form-item" label={<span className="label">密码</span>}>
              <Input.Password className="i-input" />
            </Form.Item>

            <Button className="login-btn" type="primary" htmlType="submit" loading={loading}>
              {loading ? "正在登录中..." : "登录"}
            </Button>
          </Form>

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
