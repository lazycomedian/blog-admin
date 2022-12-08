import { ModalTypeEnum } from "@/constants";
import { UniversalModalRef } from "@/typings/common";
import { useMemoizedFn, useSetState } from "ahooks";
import { Modal, ModalProps } from "antd";
import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import { ModalContext } from ".";

type WithModal = <PropsType, T extends React.ComponentType<any> = React.ComponentType<PropsType>>(
  Component: T,
  modalProps?: ModalProps
) => React.NamedExoticComponent<React.ComponentPropsWithRef<React.PropsWithRef<T>> & { ref?: React.Ref<UniversalModalRef> }>;

export const withModal: WithModal = (Component, modalProps) => {
  return memo(
    forwardRef<UniversalModalRef, any>((props, ref) => {
      const [state, setState] = useSetState<ModalProps>({ open: false, ...modalProps });

      const [modalType, setModalType] = useState<ModalTypeEnum>();

      const show = useMemoizedFn((type?: ModalTypeEnum) => {
        setState({ open: true });
        setModalType(type);
      });

      const close = useMemoizedFn(() => setState({ open: false }));

      useImperativeHandle(ref, () => ({ show, close }));

      return (
        <ModalContext.Provider value={{ props: state, setProps: setState, show, close, modalType }}>
          <Modal destroyOnClose open={state.open} onCancel={close} {...state}>
            {React.createElement(Component, props)}
          </Modal>
        </ModalContext.Provider>
      );
    })
  );
};
