import { ModalTypeEnum } from "@/enums";
import { getModalTypeLabel } from "@/utils/biz";
import { useBoolean } from "ahooks";
import { Modal } from "antd";
import { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from "react";
import FormContent from "./FormContent";
import type { FormContentRef, FormModalProps, FormModalRef } from "./lib/types";
export * from "./lib/hooks";

/**
 * 表单提交弹窗组件，统一添加/编辑弹窗风格
 *
 * @example ModalTypeEnum
 * 通过 modalRef.current?.show(ModalTypeEnum.EDIT) 的形式打开编辑类型的窗口
 * 无入参或传入 ModalTypeEnum.ADD 则默认打开添加类型的窗口
 */

const FormModal = forwardRef<FormModalRef, FormModalProps>((props, ref) => {
  const { title = "", width = 700, ...formContentProps } = props;

  const [modalType, setModalType] = useState<ModalTypeEnum>(ModalTypeEnum.ADD);

  const [open, { setTrue, setFalse: close }] = useBoolean(false);

  const dynamicTitle = useMemo(() => `${getModalTypeLabel(modalType)}${title}`, [modalType, title]);

  const formRef = useRef<FormContentRef>(null);

  useImperativeHandle(ref, () => {
    return {
      show: (modalType = ModalTypeEnum.ADD) => {
        setModalType(modalType);
        setTrue();
      },
      close,
      modalType,
      getFormInstance: () => formRef.current?.formInstance
    };
  });

  return (
    <Modal title={dynamicTitle} open={open} onCancel={close} width={width} destroyOnClose maskClosable={false} footer={null}>
      <FormContent {...formContentProps} ref={formRef} />
    </Modal>
  );
});

export default memo(FormModal) as <T>(props: FormModalProps<T>) => React.ReactElement;
