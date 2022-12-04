import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu as AntdMenu } from "antd";
import React from "react";

interface MenuProps {}

const Menu: React.FC<MenuProps> = props => {
  return (
    <AntdMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
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
          icon: <UploadOutlined />,
          label: "设置",
          children: [
            {
              key: "3-1",
              label: "角色管理"
            }
          ]
        }
      ]}
    />
  );
};

export default Menu;
