import type { ModalTypeEnum } from "@/constants";
import type { BaseModel } from "@/model/common";
import type { PropsWithModalRef, UniversalModalRef } from "@/typings/common";
import type { FormInstance, FormItemProps } from "antd";

export interface FormContentProps<Values = any> extends React.PropsWithChildren {
  loading?: boolean;
  /**
   * 表单提交事件
   * @param result 提交的表单内容
   */
  onSubmit?(result: Values): void;
  /**
   * 表单初始值
   */
  initialValues?: Partial<Values>;
  /**
   * 表单配置项
   */
  options?: FormItemProps<Values>[];
}

export interface FormModalProps<Values = any> extends FormContentProps<Values>, PropsWithModalRef<FormModalRef> {
  width?: string | number;
  /**
   * 弹窗标题
   */
  title?: string;
}

export interface FormContentRef {
  /**
   * 弹窗控制器
   */
  formInstance: FormInstance | undefined;
}

export interface FormModalRef extends Pick<UniversalModalRef, "close"> {
  /**
   * 打开弹窗
   * @param modalType 弹窗类型
   */
  show(modalType?: ModalTypeEnum): void;
  /**
   * 获取弹窗控制器
   */
  getFormInstance(): FormInstance | undefined;
  /**
   * 弹窗类型
   * @default ModalTypeEnum.ADD
   */
  modalType: ModalTypeEnum;
}

interface UseFormModalRefReturn<R> extends React.RefObject<FormModalRef>, Pick<UniversalModalRef, "close"> {
  /**
   * 当前暂存的记录值
   */
  currentRecord: R | undefined;
  /**
   * 获取表单控制器
   */
  getFormInstance(): FormInstance | undefined;
  /**
   * 弹窗类型
   * @default ModalTypeEnum.ADD
   */
  getModalType(): ModalTypeEnum;
  /**
   * 打开弹窗
   * @param modalType 弹窗类型
   * @param record 需要暂存的记录
   */
  show(modalType?: ModalTypeEnum, record?: R): void;
}

/**
 * 弹窗控制器
 *
 * @param initialRecord 需要暂存记录值的初始值
 */
export type UseFormModalRef = <R extends Partial<BaseModel>>(initialRecord?: R) => UseFormModalRefReturn<R>;
