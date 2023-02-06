import type { SysMenuModel } from "@/model/settings";
import type { UseColumns } from "@/typings/common";

import { SysMenuAPI } from "@/api";
import { usePathname, useTableColumns } from "@/hooks";
import { tips } from "@/utils";
import { getAntdIconNode } from "@/utils/common";
import { getOperationRender, getStatusRender, timeRender, whetherRender } from "@/utils/render";
import { useMemoizedFn } from "ahooks";
import React from "react";

export const useColumns: UseColumns<SysMenuModel> = ({ reload, onEdit, onAdd }) => {
  const pathname = usePathname();

  /**
   * 删除菜单
   * @param id
   */
  const remove = useMemoizedFn(async (id: number) => {
    try {
      await SysMenuAPI.remove(id);
      tips.success("删除成功");
      reload();
    } catch (error: any) {
      tips.error(error?.message || "删除失败");
    }
  });

  return useTableColumns<SysMenuModel>([
    { title: React.createElement("div", { style: { marginLeft: 20 } }, "菜单名称"), key: "name", width: 130 },
    { title: "图标", key: "icon", width: 70, render: icon => getAntdIconNode(icon, { style: { fontSize: 18 } }) },
    { title: "页面路由", key: "path", width: 180, ellipsis: true },
    { title: "组件路径", key: "component", width: 160, render: v => v ?? "目录" },
    {
      title: "状态",
      key: "status",
      render: getStatusRender(record => ({
        onChange: reload,
        service: SysMenuAPI.switch,
        disabled: pathname === record.path
      }))
    },
    { title: "是否显示", key: "visible", align: "center", render: whetherRender },
    { title: "排序", key: "sort" },
    { title: "创建时间", key: "createTime", render: timeRender },
    {
      title: "操作",
      fixed: "right",
      align: "center",
      render: getOperationRender(record => [
        { children: "添加子菜单", onClick: onAdd, disabled: !!record.component },
        { children: "编辑", onClick: onEdit },
        {
          popconfirmProps: { title: "确定要删除该菜单吗？", onConfirm: (v, r) => remove(r.id) },
          children: "删除"
        }
      ])
    }
  ]);
};
