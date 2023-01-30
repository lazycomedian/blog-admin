import { isArray } from "@sentimental/toolkit";
import { Button, Col, Form, Row } from "antd";
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo } from "react";
import styled from "styled-components";
import type { FormContentProps, FormContentRef } from "./lib/types";

const FormContent = forwardRef<FormContentRef, FormContentProps>((props, ref) => {
  const { options = [], initialValues, onSubmit, children, loading, double = false } = props;

  const [formInstance] = Form.useForm();

  useImperativeHandle(ref, () => ({ formInstance }));

  useEffect(() => {
    formInstance.setFieldsValue(initialValues);
  }, [initialValues]);

  const finalChildren = useMemo(() => {
    if (isArray<React.ReactNode[]>(children)) {
      return (
        <Row gutter={12}>
          {children.map((child, index) => (
            <Col key={index} span={double ? 12 : 24}>
              {child}
            </Col>
          ))}
        </Row>
      );
    }
    if (options.length) {
      return (
        <Row gutter={12}>
          {options.map((item, index) => (
            <Col key={index} span={double ? 12 : 24}>
              <Form.Item key={index} {...item}></Form.Item>
            </Col>
          ))}
        </Row>
      );
    }
    return children;
  }, [children, options, double]);

  return (
    <Wrapper>
      <Form
        form={formInstance}
        labelAlign="right"
        labelCol={{ span: double ? 7 : 5 }}
        onFinish={v => {
          if (onSubmit) {
            if (initialValues) {
              onSubmit(Object.assign({}, initialValues, v));
            } else onSubmit(v);
          }
        }}
      >
        {finalChildren}

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
    font-size: 14px;
  }

  .ant-input-number {
    width: 100%;
  }

  .ant-form .ant-form-item-label > label {
    font-size: 13px;
  }
`;
