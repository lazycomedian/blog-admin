import { ModalTypeEnum } from "@/constants";

/** 通用modalRef */
export interface UniversalModalRef {
  /** 打开弹窗 */
  show: (modalType?: ModalTypeEnum) => void;
  /** 关闭弹窗 */
  close: () => void;
}
