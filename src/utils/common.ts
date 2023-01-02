import { AntdIconStyle } from "@/typings/common";
import * as antdIcons from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import _ from "lodash";
import React from "react";

/**
 * 映射格式化对象
 *
 * @param template 格式化的模板及初始值
 * @param source 需要映射的源数据对象
 */
export function formatAssign<T extends Object = AnyObject>(template: T, source?: AnyObject) {
  if (!source) return template;
  const result = _.cloneDeep(template);
  for (const key in result) {
    if (key in source && typeof source[key] !== "undefined" && source[key] !== null) {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * 根据icon图标名称获取图标节点
 *
 * @param iconName 图标名称
 * @param props
 */
export function getAntdIconNode(iconName: string = "", props?: AntdIconProps): React.ReactNode {
  const icon = Reflect.get(antdIcons, iconName);
  return icon ? React.createElement(icon, props) : null;
}

/**
 * 获取@ant-design/icons包下的所有icon的风格分类
 *
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
    return iconStyles.filter(item => item.iconNames.length);
  }
}
