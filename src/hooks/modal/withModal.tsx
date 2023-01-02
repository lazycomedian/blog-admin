import { PropsWithModalRef, UniversalModalRef } from "@/typings/common";
import { useMemoizedFn, useSetState } from "ahooks";
import { Modal, ModalProps } from "antd";
import React, { forwardRef, memo, useImperativeHandle } from "react";
import { ModalContext } from ".";

type WithModal = <PropsType, T extends React.ComponentType<any> = React.ComponentType<PropsType>>(
  Component: T,
  modalProps?: ModalProps
) => React.NamedExoticComponent<React.ComponentPropsWithRef<React.PropsWithRef<T>> & PropsWithModalRef>;

export const withModal: WithModal = (Component, modalProps) => {
  return memo(
    forwardRef<UniversalModalRef, any>((props, ref) => {
      const [state, setState] = useSetState<ModalProps>({ open: false, ...modalProps });

      const show = useMemoizedFn(() => setState({ open: true }));

      const close = useMemoizedFn(() => setState({ open: false }));

      useImperativeHandle(ref, () => ({ show, close }));

      return (
        <ModalContext.Provider value={{ props: state, setProps: setState, show, close }}>
          <Modal destroyOnClose footer={null} open={state.open} onCancel={close} {...state}>
            {React.createElement(Component, props)}
          </Modal>
        </ModalContext.Provider>
      );
    })
  );
};
