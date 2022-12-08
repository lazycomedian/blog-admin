import PaginationIcon from "@/components/PaginationIcon";
import { useAntdTable, useMemoizedFn } from "ahooks";
import { AntdTableOptions, Data, Params } from "ahooks/lib/useAntdTable/types";
import { TablePaginationConfig } from "antd";
import React, { useMemo } from "react";

interface ServiceQuery extends Partial<IPage>, AnyObject {
  sorter?: any;
  filter?: any;
}

export const useTable = <T extends ServiceQuery = ServiceQuery>(
  service: (query?: T) => Promise<any>,
  options: AntdTableOptions<Data, Params> = {}
) => {
  const { defaultPageSize = 15, defaultCurrent = 1, ...restOptions } = options;

  const { run, pagination, tableProps, ...result } = useAntdTable(service as (query?: ServiceQuery) => Promise<any>, {
    defaultPageSize,
    defaultCurrent,
    ...restOptions
  });

  /**
   * 分页配置
   */
  const paginationConfig: TablePaginationConfig = useMemo(() => {
    return {
      ...pagination,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `第 ${range[0]} - ${range[1]} 条 / 共 ${total} 条`,
      pageSizeOptions: [5, 10, 15, 30, 50],
      prevIcon: React.createElement(PaginationIcon, { isPrev: true }),
      nextIcon: React.createElement(PaginationIcon)
    };
  }, [pagination]);

  const runner = useMemoizedFn((query?: T) => {
    run({
      ...query,
      current: query?.current ?? defaultCurrent,
      pageSize: query?.pageSize ?? defaultPageSize
    });
  });

  return {
    ...result,
    run: runner,
    pagination: paginationConfig,
    tableProps: { ...tableProps, pagination: paginationConfig }
  };
};
