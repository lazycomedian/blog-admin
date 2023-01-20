import { useStore } from "@/store";
import { getUserMenuTree } from "@/utils/biz";
import { Menu as AntdMenu } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const { userStore } = useStore();

  return <AntdMenu theme="dark" mode="inline" onSelect={r => navigate(r.key)} items={getUserMenuTree(userStore.userMenu)} />;
};

export default observer(Menu);
