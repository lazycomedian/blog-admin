import { EMPTY_PLACE_HOLDER } from "@/constants";
import { ColumnType } from "antd/es/table";
import { useMemo } from "react";

interface ColumnsOptions {
  withIndex?: boolean;
  align?: "left" | "center" | "right";
  expandable?: boolean;
}

interface IColumnType<R> extends Omit<ColumnType<R>, "key"> {
  key?: Exclude<keyof R, symbol>;
}

type UseTableColumns = <R = any>(columns?: Array<IColumnType<R>>, options?: ColumnsOptions) => Array<ColumnType<R>>;

export const useTableColumns: UseTableColumns = (columns = [], options) => {
  const { align, withIndex, expandable } = options || {};

  return useMemo(() => {
    const finalColumns = columns.map(item => {
      if (!item.render) item.render = value => value ?? EMPTY_PLACE_HOLDER;

      item.dataIndex = item.dataIndex ?? item.key;
      item.align = item.align ?? align;

      setDefaultWidth(item);

      if (typeof item.title === "string" && typeof item.width === "undefined") {
        item.ellipsis = item.ellipsis ?? true;
        item.width = getWidthByText(item.title);
      }
      return item;
    });

    if (withIndex) finalColumns.unshift({ title: "序号", align, render: (v, r, i) => `${i + 1}`, width: 80 });
    if (expandable) finalColumns.unshift({ title: "", width: 1, className: "expandable" });

    return finalColumns;
  }, [columns, align, withIndex]);
};

export const tableColumnWidth: Record<string, number> = {
  TIME: 140,
  STATUS: 90
};

const setDefaultWidth = (item: IColumnType<any>) => {
  const key = item.key?.toString().toUpperCase() || "";

  for (const k in tableColumnWidth) {
    if (key.includes(k)) {
      item.width = item.width ?? tableColumnWidth[k];
      break;
    }
  }
};

const getWidthByText = (text: string, fontSize = 12, padding = 16) => {
  if (typeof text !== "string") return 0;
  return text.length * fontSize + padding * 2;
};
