import type { CommonStatusEnum } from "@/constants";
import type { PopconfirmProps } from "antd";
import type { ColumnType } from "antd/es/table";
import type { LinkProps } from "antd/es/typography/Link";

export type ColumnRender<RecordType = any> = ColumnType<RecordType>["render"];

interface ROptions<RecordType> extends Omit<LinkProps, "onClick"> {
  onClick?: ColumnClick<RecordType>;
  popconfirmProps?: Omit<PopconfirmProps, "onConfirm" | "title"> & { onConfirm: ColumnClick<RecordType>; title?: string };
}

export type ColumnClick<RecordType> = (...args: Parameters<Exclude<ColumnRender<RecordType>, undefined>>) => void;

/**
 * 获取状态列render方法类型
 */
export type GetStatusRender = <RecordType = any>(props: {
  service(id: number, status: CommonStatusEnum): Promise<any>;
  onChange?: UseColumnsProps["onStatusChange"];
  rowKey?: string;
}) => ColumnRender<RecordType>;

/**
 * 获取操作列render方法类型
 */
export type GetOperationRender = <RecordType = any>(options: ROptions<RecordType>[]) => ColumnRender<RecordType>;

/**
 * 通用表格列hook参数类型
 */
export interface UseColumnsProps<RecordType = any> {
  /**
   * 点击编辑事件
   */
  onEdit?: ColumnClick<RecordType>;
  /**
   * 点击添加事件
   */
  onAdd?: ColumnClick<RecordType>;
  /**
   * 点击删除事件
   */
  onRemove?: ColumnClick<RecordType>;
  /**
   * 切换状态事件
   */
  onStatusChange?(data: any, record: RecordType, index: number): void;
  /**
   * 刷新的方法
   */
  reload(): void;
}

/**
 * 通用表格列hook类型
 */
export type UseColumns<RecordType = any> = (props: UseColumnsProps<RecordType>) => ColumnType<RecordType>[];

/**
 * 通用弹窗控制器
 */
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

/**
 * 为弹窗props添加ref类型
 */
export type PropsWithModalRef<R = UniversalModalRef, P = unknown> = P & { ref?: React.Ref<R> };

/**
 * Antd Icon风格
 * @package @ant-design/icons
 */
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
