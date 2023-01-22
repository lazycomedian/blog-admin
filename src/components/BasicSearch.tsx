import { CommonStatusEnum } from "@/enums";
import { getCommonStatusLabel } from "@/utils/common";
import { Form, Input, Select, Space } from "antd";
import React from "react";
import styled from "styled-components";

interface BasicSearchProps {
  placeholder?: string;
  onChange?(status: CommonStatusEnum): void;
  onSearch?(content: string): void;
}

const BasicSearch: React.FC<BasicSearchProps> = ({ placeholder, onChange, onSearch }) => {
  return (
    <Wrapper>
      <Form layout="inline">
        <Space size="large">
          <Form.Item label="状态">
            <Select
              options={[
                { label: getCommonStatusLabel(CommonStatusEnum.AVAILABLE), value: CommonStatusEnum.AVAILABLE },
                { label: getCommonStatusLabel(CommonStatusEnum.DISABLED), value: CommonStatusEnum.DISABLED }
              ]}
              placeholder="请选择"
              allowClear
              className="i-query-select"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item label="搜索">
            <Input.Search enterButton allowClear placeholder={placeholder} onSearch={onSearch} />
          </Form.Item>
        </Space>
      </Form>
    </Wrapper>
  );
};

export default BasicSearch;

const Wrapper = styled.div`
  .ant-form-item .i-query-select {
    width: 214px !important;
  }
`;
