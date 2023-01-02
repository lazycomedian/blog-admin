import { useTableColumns } from "@/hooks";
import { SysMenuModel } from "@/model/settings";
import { SysMenuService } from "@/service/api";
import { UseColumns } from "@/typings/common";
import { getAntdIconNode, tips } from "@/utils";
import { getOperationRender, getStatusRender, timeRender } from "@/utils/render";
import { useMemoizedFn } from "ahooks";

export const useColumns: UseColumns<SysMenuModel> = ({ reload, onEdit, onAdd }) => {
  /**
   * 删除菜单
   *
   * @param id
   */
  const remove = useMemoizedFn(async (id: number) => {
    try {
      await SysMenuService.remove(id);
      tips.success("删除成功");
      reload();
    } catch (error: any) {
      tips.error(error?.message || "删除失败");
    }
  });

  return useTableColumns<SysMenuModel>([
    { title: "菜单名称", key: "name", width: 140 },
    { title: "图标", key: "icon", width: 80, render: icon => getAntdIconNode(icon, { style: { fontSize: 18 } }) },
    { title: "页面路由", key: "path", width: 180, ellipsis: true, render: (v, r) => (r.prefixPath || "") + (v || "") },
    { title: "组件路径", key: "component", width: 160, render: v => v ?? "目录" },
    { title: "状态", key: "status", render: getStatusRender({ onChange: reload, service: SysMenuService.switch }) },
    { title: "排序", key: "sort" },
    { title: "创建时间", key: "createTime", render: timeRender },
    {
      title: "操作",
      fixed: "right",
      align: "center",
      render: getOperationRender([
        { children: "添加子菜单", onClick: onAdd },
        { children: "编辑", onClick: onEdit },
        {
          popconfirmProps: { title: "确定要删除该管理员吗？", onConfirm: (v, r) => remove(r.id) },
          children: "删除"
        }
      ])
    }
  ]);
};
