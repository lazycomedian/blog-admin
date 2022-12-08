import { getModalTypeLabel, ModalTypeEnum } from "@/constants";
import { useModalProps, withModal } from "@/hooks/modal";
import { Button, Form, FormItemProps } from "antd";
import React, { useEffect } from "react";

/**
 * 表单提交弹窗组件，统一添加/编辑弹窗风格
 *
 * @example ModalTypeEnum
 * 通过modalRef.current?.show(ModalTypeEnum.EDIT)的形式打开编辑类型的窗口
 * 无入参或传入ModalTypeEnum.ADD 则默认打开添加类型的窗口
 */

interface FormModalProps<Values> extends React.PropsWithoutRef<any>, React.PropsWithChildren {
  loading?: boolean;

  /** 弹窗标题 */
  title?: string;

  /**
   * 表单提交事件
   *
   * @param record 提交的表单
   * @param modalType 弹窗类型
   */
  onSubmit?: (record: Values, modalType?: ModalTypeEnum) => void;

  /** 表单初始值 */
  initialValues?: Partial<Values>;

  /** 表单配置 */
  options?: FormItemProps<Values>[];
}

type FormModalFC = <Values extends any = any>(props: FormModalProps<Values>) => React.ReactElement;

const FormModal: FormModalFC = props => {
  const { options = [], initialValues, title = "", onSubmit, children, loading } = props;

  const [form] = Form.useForm();

  const { modalType } = useModalProps(() => ({
    title: `${getModalTypeLabel(modalType || ModalTypeEnum.ADD)}${title}`
  }));

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form form={form} labelAlign="right" labelCol={{ span: 5 }} onFinish={v => onSubmit && onSubmit(v, modalType)}>
      {children ?? options.map((item, index) => <Form.Item key={index} {...item}></Form.Item>)}

      <Button block type="primary" size="large" htmlType="submit" loading={loading}>
        提交
      </Button>
    </Form>
  );
};

export default withModal(FormModal, { footer: null, width: 600, maskClosable: false }) as FormModalFC;
