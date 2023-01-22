import { usePathname } from "@/hooks";
import { useStore } from "@/store";
import { getOpenKeysByPath, getUserMenuTree } from "@/utils/common";
import { useUpdateEffect } from "ahooks";
import { Menu as AntdMenu } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface LayoutMenuProps {
  collapsed: boolean;
}

const LayoutMenu: React.FC<LayoutMenuProps> = ({ collapsed }) => {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const pathname = usePathname();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenKeys(getOpenKeysByPath(pathname));
  }, [pathname]);

  useUpdateEffect(() => {
    if (!collapsed) setOpenKeys(getOpenKeysByPath(selectedKeys.at(0)));
  }, [collapsed]);

  return (
    <Wrapper>
      <AntdMenu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onSelect={record => {
          setSelectedKeys([record.key]);
          navigate(record.key);
        }}
        onOpenChange={keys => {
          const latestOpenKey = keys.find(key => !openKeys.includes(key));

          if (latestOpenKey && !openKeys.includes(latestOpenKey) && openKeys.every(key => key.includes(latestOpenKey))) {
            // 解决antd官网示例中三级菜单展开后收起当前一级菜单再展开一级菜单的闪烁问题
            setOpenKeys([latestOpenKey, ...keys]);
          } else if (!userStore.userMenu.map(item => item.path).includes(latestOpenKey)) {
            setOpenKeys(keys);
          } else {
            if (latestOpenKey) {
              if (selectedKeys[0]?.includes(latestOpenKey)) setOpenKeys(getOpenKeysByPath(selectedKeys[0]));
              else setOpenKeys([latestOpenKey]);
            } else {
              setOpenKeys([]);
            }
          }
        }}
        items={getUserMenuTree(userStore.userMenu)}
      />
    </Wrapper>
  );
};

export default observer(LayoutMenu);

const Wrapper = styled.div`
  .ant-menu {
    background: transparent;

    .ant-menu-item,
    .ant-menu-submenu-title {
      height: 52px;
      margin-inline: 0px;
      margin-block: unset;
      width: 100%;
      border-radius: unset;
    }
    .ant-menu-sub.ant-menu-inline,
    .ant-menu-item-selected:not(.ant-menu-item-only-child) {
      background-color: #101117;
    }
  }
`;
