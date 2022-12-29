import { useTableColumns } from "@/hooks";
import { UseColumns } from "@/typings/common";

export const useColumns: UseColumns = () => {
  return useTableColumns([]);
};
