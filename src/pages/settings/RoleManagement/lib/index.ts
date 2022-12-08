import { useTableColumns } from "@/hooks";
import { RoleModel } from "@/model/role";
import { RoleService } from "@/service/api";
import { UseColumns } from "@/typings/columns";
import { tips } from "@/utils";
import { getOperationRender, getStatusRender, timeRender } from "@/utils/columns";
import { useMemoizedFn } from "ahooks";

export const useColumns: UseColumns<RoleModel> = ({ reload, onEdit }) => {
  /**
   * 删除角色
   *
   * @param id
   */
  const remove = useMemoizedFn(async (id: number) => {
    try {
      await RoleService.remove(id);
      tips.success("删除成功");
      reload();
    } catch (error) {
      tips.error("删除失败");
    }
  });

  return useTableColumns<RoleModel>([
    { title: "ID", key: "id" },
    { title: "角色名", key: "roleName" },
    { title: "状态", key: "status", render: getStatusRender({ onChange: reload, service: RoleService.switch }) },
    { title: "权限", key: "permission" },
    { title: "创建时间", key: "createTime", render: timeRender },
    {
      title: "操作",
      fixed: "right",
      width: 180,
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
