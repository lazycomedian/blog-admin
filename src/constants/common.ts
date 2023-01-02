/**
 * 占位符
 */
export const EMPTY_PLACE_HOLDER = "";

/**
 * 时间格式化方式
 */
export const FORMAT = "YYYY-MM-DD HH:mm:ss";

/**
 * 业务弹窗类型
 */
export enum ModalTypeEnum {
  /** 添加 */
  ADD = "@ModalTypeEnum/ADD",
  /** 编辑 */
  EDIT = "@ModalTypeEnum/EDIT,"
}

/**
 * 映射弹窗类型文字描述
 *
 * @param modalType 弹窗类型
 * @returns 弹窗类文字描述
 */
export const getModalTypeLabel = (modalType: ModalTypeEnum) => {
  switch (modalType) {
    case ModalTypeEnum.ADD:
      return "添加";
    case ModalTypeEnum.EDIT:
      return "编辑";
    default:
      return "操作";
  }
};

/**
 * 通用状态
 */
export enum CommonStatusEnum {
  /** 不可用 */
  DISABLED,
  /** 可用 */
  AVAILABLE
}

/**
 * 映射通用状态标签描述
 *
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
 * 通用状态下拉options
 */
export const statusOptions: { readonly label: string; readonly value: CommonStatusEnum }[] = [
  { label: getCommonStatusLabel(CommonStatusEnum.AVAILABLE), value: CommonStatusEnum.AVAILABLE },
  { label: getCommonStatusLabel(CommonStatusEnum.DISABLED), value: CommonStatusEnum.DISABLED }
];

/**
 * 部分常见属性表格列宽
 */
export const tableColumnWidth: Record<string, number> = {
  TIME: 140,
  STATUS: 90
};
