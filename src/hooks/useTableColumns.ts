import { EMPTY_PLACE_HOLDER } from "@/constants/common";
import { ColumnType } from "antd/es/table";
import { useMemo } from "react";

interface ColumnsOptions {
  withIndex?: boolean;
  align?: "left" | "center" | "right";
}

export const useTableColumns = <RecordType = any>(columns: ColumnType<RecordType>[] = [], options?: ColumnsOptions) => {
  const { align, withIndex } = options || {};

  return useMemo(() => {
    const finalColumns = columns.map(item => {
      if (!item.render) item.render = value => value ?? EMPTY_PLACE_HOLDER;

      item.dataIndex = item.dataIndex ?? item.key;
      item.align = item.align ?? align;
      return item;
    });

    if (withIndex) finalColumns.unshift({ title: "序号", align, render: (v, r, i) => `${i + 1}`, width: 80 });

    return finalColumns;
  }, [columns, align, withIndex]);
};
