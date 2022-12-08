import { ModalTypeEnum } from "@/constants";
import { UniversalModalRef } from "@/typings/common";
import { SetState } from "ahooks/lib/useSetState";
import { ModalProps } from "antd";
import React, { useEffect } from "react";
export * from "./withModal";

interface ModalContextType extends UniversalModalRef {
  props: ModalProps;
  setProps: SetState<ModalProps>;
  modalType?: ModalTypeEnum;
}

export const ModalContext = React.createContext<ModalContextType | null>(null);

/**
 * 弹窗控制器
 */
export const useModalRef = () => React.useRef<UniversalModalRef>(null);

/**
 * 重写弹窗属性
 * @param override 重写的方法，返回新的弹窗属性，第一个参数为弹窗props的set方法
 * @param deps 更新依赖
 */
export const useModalProps = (override?: (setProps: SetState<ModalProps>) => ModalProps, deps: any[] = []) => {
  const { setProps, show, close, modalType, props } = React.useContext(ModalContext)!;

  useEffect(() => {
    if (override) {
      const newProps = override(setProps);
      setProps(newProps);
    }
  }, deps);

  return { show, close, visible: props.open, modalType };
};
