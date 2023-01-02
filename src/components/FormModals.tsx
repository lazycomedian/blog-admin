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

interface FormModalProps<T = any> extends React.PropsWithChildren, PropsWithModalRef {
  loading?: boolean;
  /**
   * 弹窗标题
   */
  title?: string;
  /**
   * 表单提交事件
   * @param result 提交的表单内容
   */
  onSubmit?: (result: T) => void;
  /**
   * 表单初始值
   */
  initialValues?: Partial<T>;
  /**
   * 表单配置项
   */
  options?: FormItemProps<T>[];
  width?: string | number;
}

type FormModalFC = <T = any>(props: FormModalProps<T>) => React.ReactElement;

const FormModal: FormModalFC = props => {
  const { options = [], initialValues, title = "", onSubmit, children, loading, width = 700 } = props;

  const [formInstance] = Form.useForm();

  const { modalType } = useModalProps(
    () => ({
      width,
      title: `${getModalTypeLabel(modalType || ModalTypeEnum.ADD)}${title}`
    }),
    { formInstance }
  );

  useEffect(() => {
    formInstance.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Wrapper>
      <Form form={formInstance} labelAlign="right" labelCol={{ span: 5 }} onFinish={v => onSubmit && onSubmit(v)}>
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

  .ant-input-number {
    width: 100%;
  }
`;
