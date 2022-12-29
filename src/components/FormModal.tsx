import { getModalTypeLabel, ModalTypeEnum } from "@/constants";
import { useModalProps, withModal } from "@/hooks/modal";
import { PropsWithModalRef } from "@/typings/common";
import { Button, Form, FormItemProps } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";

/**
 * 表单提交弹窗组件，统一添加/编辑弹窗风格
 *
 * @example ModalTypeEnum
 * 通过 modalRef.current?.show(ModalTypeEnum.EDIT) 的形式打开编辑类型的窗口
 * 无入参或传入 ModalTypeEnum.ADD 则默认打开添加类型的窗口
 */

interface FormModalProps<Values = any> extends React.PropsWithChildren, PropsWithModalRef {
  loading?: boolean;
  /** 弹窗标题 */
  title?: string;
  /**
   * 表单提交事件
   * @param result 提交的表单内容
   * @param modalType 弹窗类型
   */
  onSubmit?: (result: Values, modalType?: ModalTypeEnum) => void;
  /** 表单初始值 */
  initialValues?: Partial<Values>;
  /** 表单配置项 */
  options?: FormItemProps<Values>[];
  width?: string | number;
}

type FormModalFC = <Values extends any = any>(props: FormModalProps<Values>) => React.ReactElement;

const FormModal: FormModalFC = props => {
  const { options = [], initialValues, title = "", onSubmit, children, loading, width = 700 } = props;

  const [form] = Form.useForm();

  const { modalType } = useModalProps(() => ({
    width,
    title: `${getModalTypeLabel(modalType || ModalTypeEnum.ADD)}${title}`
  }));

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Wrapper>
      <Form form={form} labelAlign="right" labelCol={{ span: 5 }} onFinish={v => onSubmit && onSubmit(v, modalType)}>
        {children ?? options.map((item, index) => <Form.Item key={index} {...item}></Form.Item>)}

        <Button block type="primary" size="large" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form>
    </Wrapper>
  );
};

export default withModal(FormModal, { footer: null, width: 700, maskClosable: false }) as FormModalFC;

const Wrapper = styled.div`
  .ant-btn-lg {
    height: 36px;
    padding-top: 0;
    padding-bottom: 0;
  }
`;
