import type { ColumnRender, GetOperationRender, GetStatusRender } from "@/typings/render";

import StatusSwitch from "@/components/StatusSwitch";
import { EMPTY_PLACE_HOLDER, FORMAT } from "@/constants";
import { isFunction } from "@sentimental/toolkit";
import { Divider, Popconfirm, Typography } from "antd";
import React from "react";
import { dayjs } from ".";

/**
 * 通用时间渲染方法，用于table表格列配置
 * @param value
 */
export const timeRender: ColumnRender = value => (value ? dayjs(value).format(FORMAT) : EMPTY_PLACE_HOLDER);

/**
 * 获取通用状态渲染方法，用于table表格列配置
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
 * @param options 配置项
 */
export const getOperationRender: GetOperationRender = (options = []) => {
  return (value, record, index) => {
    const rOptions = isFunction(options) ? options(record) : options;
    return (
      <React.Fragment>
        {rOptions.map(({ onClick, popconfirmProps, children, ...props }, i) => {
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
};
