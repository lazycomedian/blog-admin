import { useAntdTable } from "ahooks";
import { AntdTableOptions, Data, Params } from "ahooks/lib/useAntdTable/types";
import { TablePaginationConfig } from "antd";

interface ServiceQuery extends Partial<IPage>, AnyObject {
  sorter?: any;
  filter?: any;
}

export const useTable = <T extends ServiceQuery = ServiceQuery>(
  service: (query?: T) => Promise<any>,
  options?: AntdTableOptions<Data, Params>
) => {
  const { run, pagination, tableProps, ...result } = useAntdTable(<(query?: ServiceQuery) => Promise<any>>service, options);

  const { defaultPageSize = 15, defaultCurrent = 1 } = options || {};

  /**
   * 分页配置
   */
  const paginationConfig: TablePaginationConfig = {
    ...pagination,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `第 ${range[0]} - ${range[1]} 条 / 共 ${total} 条`,
    pageSizeOptions: [5, 10, 15, 30, 50]
  };

  const runner = (query?: T) => {
    run({ ...query, current: query?.current ?? defaultCurrent, pageSize: query?.pageSize ?? defaultPageSize });
  };

  return { ...result, run: runner, pagination: paginationConfig, tableProps: { ...tableProps, pagination: paginationConfig } };
};
