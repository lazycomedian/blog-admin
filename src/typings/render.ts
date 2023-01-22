import type { CommonStatusEnum } from "@/enums";
import type { PopconfirmProps } from "antd";
import type { ColumnType } from "antd/es/table";
import type { LinkProps } from "antd/es/typography/Link";

/** Antd Table 表格列render方法 */
export type ColumnRender<RecordType = any> = ColumnType<RecordType>["render"];

/** 表格列点击方法 */
type ColumnClick<RecordType> = (...args: Parameters<Exclude<ColumnRender<RecordType>, undefined>>) => void;

/** 获取状态列render方法 */
export type GetStatusRender = <RecordType = any>(props: {
  service(id: number, status: CommonStatusEnum): Promise<any>;
  onChange?: UseColumnsProps["onStatusChange"];
  rowKey?: string;
}) => ColumnRender<RecordType>;

/** 操作列选项 */
interface ROptions<RecordType> extends Omit<LinkProps, "onClick"> {
  onClick?: ColumnClick<RecordType>;
  popconfirmProps?: Omit<PopconfirmProps, "onConfirm" | "title"> & { onConfirm: ColumnClick<RecordType>; title?: string };
}

/** 获取操作列render方法 */
export type GetOperationRender = <RecordType = any>(options: ROptions<RecordType>[]) => ColumnRender<RecordType>;

/** 通用表格列hook方法参数 */
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
   * @param data
   * @param record 当前行数据
   * @param index 当前行数据在源列表中的索引
   */
  onStatusChange?(data: any, record: RecordType, index: number): void;
  /**
   * 刷新的方法
   */
  reload(): void;
}
