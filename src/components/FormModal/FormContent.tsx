import type { FormContentProps, FormContentRef } from "./lib/types";

import { tips } from "@/utils";
import { isArray, isPromise } from "@sentimental/toolkit";
import { useMemoizedFn } from "ahooks";
import { Button, Col, Form, Row } from "antd";
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useState } from "react";
import styled from "styled-components";

interface ContentProps extends FormContentProps {
  label: string;
}

const FormContent = forwardRef<FormContentRef, ContentProps>((props, ref) => {
  const { options = [], initialValues, onSubmit, children, loading, doubleColumn = false, label } = props;
  const [formInstance] = Form.useForm();
  useImperativeHandle(ref, () => ({ formInstance }));

  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    formInstance.setFieldsValue(initialValues);
  }, [initialValues]);

  const submit = useMemoizedFn((v: any) => {
    if (!onSubmit) return;
    const result = onSubmit(initialValues ? Object.assign({}, initialValues, v) : v, label);
    if (isPromise(result)) {
      setSubmitLoading(true);
      result
        .then(() => tips.success(label + "成功"))
        .catch(error => {
          tips.error(error?.message || label + "失败");
        })
        .finally(() => setSubmitLoading(false));
    }
  });

  const finalChildren = useMemo(() => {
    if (isArray<React.ReactNode[]>(children)) {
      return (
        <Row gutter={12}>
          {children.map((child, index) => (
            <Col key={index} span={doubleColumn ? 12 : 24}>
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
            <Col key={index} span={doubleColumn ? 12 : 24}>
              <Form.Item key={index} {...item}></Form.Item>
            </Col>
          ))}
        </Row>
      );
    }
    return children;
  }, [children, options, doubleColumn]);

  return (
    <Wrapper>
      <Form form={formInstance} labelAlign="right" labelCol={{ span: doubleColumn ? 7 : 5 }} onFinish={submit}>
        {finalChildren}

        <Button block type="primary" size="large" htmlType="submit" loading={submitLoading || loading}>
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
