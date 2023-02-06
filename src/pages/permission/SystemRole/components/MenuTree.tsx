import type { UserMenuModel } from "@/model/settings";
import { useStore } from "@/store";
import { useMemoizedFn } from "ahooks";
import { Tree } from "antd";
import { type DataNode } from "antd/es/tree";
import React, { useMemo } from "react";
import styled from "styled-components";

interface MenuTreeProps {}

const MenuTree: React.FC<MenuTreeProps> = props => {
  const { userStore } = useStore();

  /**
   * 组装用户菜单树
   * @param menu
   */
  const convertMenuTree = useMemoizedFn((menu: UserMenuModel[]): DataNode[] => {
    return menu.map(item => ({
      key: item.id,
      title: item.name,
      children: item.children?.length ? convertMenuTree(item.children) : undefined
    }));
  });

  const data = useMemo(() => convertMenuTree(userStore.userMenu), [userStore.userMenu]);

  return (
    <Wrapper>
      <Tree checkable selectable={false} onCheck={checked => console.log(checked)} treeData={data} />
    </Wrapper>
  );
};

export default MenuTree;

const Wrapper = styled.div``;
