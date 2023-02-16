import type { SysRoleModel } from "@/model/settings";
import type { UseColumns } from "@/typings/common";

import { SysRoleAPI } from "@/api";
import { useTableColumns } from "@/hooks";
import { tips } from "@/utils";
import { getOperationRender, getStatusRender, timeRender } from "@/utils/render";
import { useMemoizedFn } from "ahooks";

export const useColumns: UseColumns<SysRoleModel> = ({ reload, onEdit }) => {
  /**
   * 删除角色
   * @param id
   */
  const remove = useMemoizedFn(async (id: number) => {
    try {
      await SysRoleAPI.remove(id);
      tips.success("删除成功");
      reload();
    } catch (error: any) {
      tips.error(error?.message || "删除失败");
    }
  });

  return useTableColumns<SysRoleModel>([
    { title: "ID", key: "id" },
    { title: "角色名称", key: "roleName" },
    { title: "权限", render: (v, record) => record.menuList.map(item => item.menuName).join(",") },
    { title: "状态", key: "status", render: getStatusRender({ onChange: reload, service: SysRoleAPI.switch }) },
    { title: "创建时间", key: "createTime", render: timeRender },
    {
      title: "操作",
      fixed: "right",
      align: "center",
      render: getOperationRender([
        { children: "编辑", onClick: onEdit },
        {
          popconfirmProps: { title: "确定要删除该角色吗？", onConfirm: (v, r) => remove(r.id) },
          children: "删除"
        }
      ])
    }
  ]);
};
