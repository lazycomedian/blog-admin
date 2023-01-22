import type { MenuItemType } from "antd/es/menu/hooks/useItems";
import type { ColumnType } from "antd/es/table";
import type { UseColumnsProps } from "./render";

import { iconfontTypes } from "@/constants";

/** 通用弹窗控制器 */
export interface UniversalModalRef {
  /**
   * 打开弹窗
   */
  show(): void;
  /**
   * 关闭弹窗
   */
  close(): void;
}

/** 为弹窗props添加ref参数 */
export type PropsWithModalRef<R = UniversalModalRef, P = unknown> = P & { ref?: React.Ref<R> };

/** label&value为成员的键值对 */
export interface LVPair<L = string, V = any> {
  label: L;
  value: V;
}

/** 自定义的iconfont名称 */
export type IconfontType = typeof iconfontTypes[number];

/** 通用表格列hook方法 */
export type UseColumns<RecordType = any> = (props: UseColumnsProps<RecordType>) => ColumnType<RecordType>[];

/** Antd菜单项 */
export interface AntdMenuItem extends Pick<MenuItemType, "label" | "icon" | "key"> {
  children?: AntdMenuItem[];
}

/** Antd Icon风格 */
export interface AntdIconStyle {
  /**
   * 风格分类名
   */
  title: string;
  /**
   * 风格关键字
   */
  key: string;
  /**
   * icon名称集合
   */
  iconNames: string[];
}
