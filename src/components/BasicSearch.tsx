import { CommonStatusEnum } from "@/enums";
import { QueryModel } from "@/model/common";
import { getCommonStatusLabel } from "@/utils/common";
import { useSetState, useUpdateEffect } from "ahooks";
import { Form, Input, Select, Space } from "antd";
import React, { memo } from "react";
import styled from "styled-components";

interface BasicSearchProps {
  placeholder?: string;
  onSearch?: (result: QueryModel) => void;
}

const BasicSearch: React.FC<BasicSearchProps> = ({ placeholder, onSearch }) => {
  const [form] = Form.useForm<QueryModel>();

  const [state, setState] = useSetState<QueryModel>({});

  useUpdateEffect(() => onSearch && onSearch(state), [state]);

  return (
    <Wrapper>
      <Form<QueryModel> layout="inline" form={form}>
        <Space size="large">
          <Form.Item label="状态" name="status">
            <Select
              options={[
                { label: getCommonStatusLabel(CommonStatusEnum.AVAILABLE), value: CommonStatusEnum.AVAILABLE },
                { label: getCommonStatusLabel(CommonStatusEnum.DISABLED), value: CommonStatusEnum.DISABLED }
              ]}
              placeholder="请选择"
              allowClear
              className="i-query-select"
              onChange={status => setState({ status })}
            />
          </Form.Item>
          <Form.Item label="搜索" name="content">
            <Input.Search enterButton allowClear placeholder={placeholder} onSearch={content => setState({ content })} />
          </Form.Item>
        </Space>
      </Form>
    </Wrapper>
  );
};

export default memo(BasicSearch);

const Wrapper = styled.div`
  .ant-form-item .i-query-select {
    width: 214px !important;
  }
`;
