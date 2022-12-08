import { SettingOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu as AntdMenu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MenuProps {}

const Menu: React.FC<MenuProps> = props => {
  const navigate = useNavigate();
  return (
    <AntdMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      onSelect={r => navigate(r.key)}
      items={[
        {
          key: "1",
          icon: <UserOutlined />,
          label: "nav 1"
        },
        {
          key: "2",
          icon: <VideoCameraOutlined />,
          label: "nav 2"
        },
        {
          key: "3",
          icon: <SettingOutlined />,
          label: "设置",
          children: [
            {
              key: "/settings/role-management",
              label: "角色管理"
            },
            {
              key: "/settings/user-management",
              label: "用户管理"
            }
          ]
        }
      ]}
    />
  );
};

export default Menu;
