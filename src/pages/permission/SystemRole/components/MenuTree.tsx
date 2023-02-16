import type { UserMenuModel } from "@/model/settings";
import { useStore } from "@/store";
import { Tree } from "antd";
import { type DataNode } from "antd/es/tree";
import React, { useMemo } from "react";
import styled from "styled-components";

interface MenuTreeProps {
  value?: number[];
  onChange?: (value: unknown) => void;
}

const MenuTree: React.FC<MenuTreeProps> = ({ value = [], onChange }) => {
  const { userStore } = useStore();

  /**
   * 组装用户菜单树
   * @param menu
   */
  const convertMenuTree = (menu: UserMenuModel[]): DataNode[] => {
    return menu.map(item => ({
      key: item.id,
      title: item.name,
      children: item.children?.length ? convertMenuTree(item.children) : undefined
    }));
  };

  const data = useMemo(() => convertMenuTree(userStore.userMenu), [userStore.userMenu]);

  // const defaultExpandedkeys = useMemo(() => {
  //   const expandedMenus = userStore.flattenUserMenu.filter(item => !isCatalogue(item) && value.includes(item.id));
  //   const set = new Set<number>();
  //   expandedMenus.forEach(item => {
  //     const parent = userStore.flattenUserMenu.find(f => f.id === item.pid);
  //     if (parent && isCatalogue(parent)) set.add(parent.id);
  //   });
  //   return Array.from(set);
  // }, [userStore.flattenUserMenu, value]);

  return (
    <Wrapper>
      <Tree checkable selectable={false} checkedKeys={value} onCheck={onChange} treeData={data} />
    </Wrapper>
  );
};

export default MenuTree;

const Wrapper = styled.div`
  padding: 4px 0;
`;
