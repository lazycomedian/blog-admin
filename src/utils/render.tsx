import StatusSwitch from "@/components/StatusSwitch";
import { CommonStatusEnum, EMPTY_PLACE_HOLDER, FORMAT, getCommonStatusLabel, statusOptions } from "@/constants";
import type { ColumnRender, GetOperationRender, GetStatusRender } from "@/typings/common";
import { Divider, Form, Popconfirm, Radio, Select, SelectProps, Typography } from "antd";
import React from "react";
import { dayjs } from ".";

/**
 * 通用时间渲染方法，用于table表格列配置
 *
 * @param value
 */
export const timeRender: ColumnRender = value => (value ? dayjs(value).format(FORMAT) : EMPTY_PLACE_HOLDER);

/**
 * 获取通用状态渲染方法，用于table表格列配置
 *
 * @param onChange 状态改变事件
 */
export const getStatusRender: GetStatusRender = ({ service, onChange, rowKey }) => {
  return (value, record, index) => (
    <StatusSwitch
      record={record}
      rowKey={rowKey}
      service={service}
      onChange={data => onChange && onChange(data, record, index)}
    />
  );
};

/**
 * 获取表格操作列render，用于table表格列配置
 *
 * @param options 配置项
 */
export const getOperationRender: GetOperationRender = (options = []) => {
  return (value, record, index) => (
    <React.Fragment>
      {options.map(({ onClick, popconfirmProps, children, ...props }, i) => {
        return (
          <React.Fragment key={i}>
            {i > 0 && <Divider type="vertical" />}
            <Popconfirm
              open={popconfirmProps ? undefined : false}
              title="确定要删除吗？"
              {...popconfirmProps}
              onConfirm={() => popconfirmProps?.onConfirm && popconfirmProps.onConfirm(value, record, index)}
            >
              <Typography.Link {...props} onClick={() => onClick && onClick(value, record, index)}>
                {children}
              </Typography.Link>
            </Popconfirm>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

/**
 * 用于添加/修改Form的状态表单项组件
 */
export const StatusFormItem: React.FC = () => (
  <Form.Item label="是否开启" name="status">
    <Radio.Group>
      <Radio value={CommonStatusEnum.AVAILABLE}>{getCommonStatusLabel(CommonStatusEnum.AVAILABLE)}</Radio>
      <Radio value={CommonStatusEnum.DISABLED}>{getCommonStatusLabel(CommonStatusEnum.DISABLED)}</Radio>
    </Radio.Group>
  </Form.Item>
);

/**
 * 用于查询Form的状态表单组件
 *
 * @param onChange
 */
export const StatusQueryFormItem: React.FC<Pick<SelectProps, "onChange">> = ({ onChange }) => (
  <Form.Item label="状态" name="status">
    <Select options={statusOptions} placeholder="请选择" allowClear className="i-query-select" onChange={onChange} />
  </Form.Item>
);
