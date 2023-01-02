import { Button, Form } from "antd";
import { forwardRef, memo, useEffect, useImperativeHandle } from "react";
import styled from "styled-components";
import type { FormContentProps, FormContentRef } from "./lib/types";

const FormContent = forwardRef<FormContentRef, FormContentProps>((props, ref) => {
  const { options = [], initialValues, onSubmit, children, loading } = props;

  const [formInstance] = Form.useForm();

  useImperativeHandle(ref, () => ({ formInstance }));

  useEffect(() => {
    formInstance.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Wrapper>
      <Form
        form={formInstance}
        labelAlign="right"
        labelCol={{ span: 5 }}
        onFinish={v => {
          if (onSubmit) {
            if (initialValues) {
              onSubmit(Object.assign({}, initialValues, v));
            } else onSubmit(v);
          }
        }}
      >
        {children ?? options.map((item, index) => <Form.Item key={index} {...item}></Form.Item>)}

        <Button block type="primary" size="large" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form>
    </Wrapper>
  );
});

export default memo(FormContent);

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
