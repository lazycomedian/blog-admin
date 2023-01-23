import type { UserMenuModel } from "@/model/settings";
import type { AntdIconStyle, AntdMenuItem, IconfontType } from "@/typings/common";
import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

import Iconfont from "@/components/Iconfont";
import { iconfontTypes } from "@/constants";
import { CommonStatusEnum, ModalTypeEnum } from "@/enums";
import * as antdIcons from "@ant-design/icons";
import { concatString } from "@sentimental/toolkit";
import React from "react";

/**
 * 获取pages下的所有页面组件，默认使用路由懒加载
 * @returns {Map<string, React.FC | undefined>} 页面路由为key的组件集合
 */
export function getAllPagesMap(): Map<string, React.FC | undefined> {
  const files = import.meta.glob<boolean, string, { default: React.ComponentType }>("@/pages/**/index.tsx");
  const pagesMap = new Map<string, React.FC | undefined>();

  for (const path in files) {
    const key = path.replace(/^\/src\/pages/, "").replace(/\/index.tsx$/, "");
    pagesMap.set(key, React.lazy(Reflect.get(files, path)));
  }
  return pagesMap;
}

export const allPagesMap = getAllPagesMap();

/**
 * 根据icon图标名称获取图标节点
 * @param iconName 图标名称
 * @param props
 */
export function getAntdIconNode(iconName: string = "", props?: AntdIconProps): React.ReactNode {
  if (iconName in antdIcons) {
    const icon = Reflect.get(antdIcons, iconName);
    return icon ? React.createElement(icon, props) : null;
  }
  if (iconfontTypes.includes(<IconfontType>iconName)) {
    return React.createElement(Iconfont, { type: <IconfontType>iconName, style: props?.style });
  }
}

/**
 * 获取@ant-design/icons包下的所有icon的风格分类
 * @param iconName 过滤icon集合的名称
 * @package @ant-design/icons
 */
export function getAntdIconNames(iconName: string = "") {
  const iconStyles: AntdIconStyle[] = [
    { title: "线框风格", key: "Outlined", iconNames: [] },
    { title: "实底风格", key: "Filled", iconNames: [] },
    { title: "双色风格", key: "TwoTone", iconNames: [] }
  ];

  try {
    for (const iconKey in antdIcons) {
      iconStyles.forEach(item => {
        if (!iconKey.split(item.key).at(-1) && iconKey.toLowerCase().includes(iconName.toLowerCase())) {
          item.iconNames.push(iconKey);
        }
      });
    }
  } finally {
    iconStyles.push({ key: "Iconfont", title: "Iconfont", iconNames: <string[]>(<unknown>iconfontTypes) });
    return iconStyles.filter(item => item.iconNames.length);
  }
}

/**
 * 获取弹窗类型文字描述
 * @param modalType 弹窗类型
 * @returns 弹窗类文字描述
 */
export function getModalTypeLabel(modalType: ModalTypeEnum) {
  switch (modalType) {
    case ModalTypeEnum.ADD:
      return "添加";
    case ModalTypeEnum.EDIT:
      return "编辑";
    default:
      return "操作";
  }
}

/**
 * 获取通用状态标签描述
 * @param status 状态
 * @returns 文字描述
 */
export const getCommonStatusLabel = (status: CommonStatusEnum | string) => {
  switch (status) {
    case CommonStatusEnum.AVAILABLE:
      return "开启";
    case CommonStatusEnum.DISABLED:
      return "关闭";
    default:
      return "";
  }
};

/**
 * 获取用户菜单树结构
 * @param menu
 */
export function getUserMenuTree(menu: UserMenuModel[]): AntdMenuItem[] {
  return menu.map(item => {
    let children: AntdMenuItem[] | undefined = undefined;
    if (item.children?.length) children = getUserMenuTree(item.children);
    if (!item.component && !children?.length) children = [];

    return {
      label: item.name,
      children,
      key: concatString(item.prefixPath, item.path),
      icon: getAntdIconNode(item.icon)
    };
  });
}

/**
 * 通过路径组装完整的路径集合
 * @param path
 */
export function getOpenKeysByPath(path: string | undefined): string[] {
  if (!path) return [];
  const pathList = path.split("/").slice(0, -1).filter(Boolean);
  return pathList.reduce<string[]>((prev, cur) => {
    prev.push(prev.length === 0 ? "/" + cur : prev.at(-1) + "/" + cur);
    return prev;
  }, []);
}
