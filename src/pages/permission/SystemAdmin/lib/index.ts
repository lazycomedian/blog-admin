import type { SysAdminModel } from "@/model/settings";
import type { UseColumns } from "@/typings/common";

import { SysAdminAPI } from "@/api";
import { SUPER_ADMIN_ID } from "@/constants";
import { useTableColumns } from "@/hooks";
import { tips } from "@/utils";
import { getOperationRender, getStatusRender, timeRender } from "@/utils/render";
import { useMemoizedFn } from "ahooks";
import { Tag } from "antd";
import React from "react";

export const useColumns: UseColumns<SysAdminModel> = ({ reload, onEdit }) => {
  /**
   * 删除管理员
   * @param id
   */
  const remove = useMemoizedFn(async (id: number) => {
    try {
      await SysAdminAPI.remove(id);
      tips.success("删除成功");
      reload();
    } catch (error: any) {
      tips.error(error?.message || "删除失败");
    }
  });

  return useTableColumns<SysAdminModel>([
    { title: "ID", key: "id" },
    { title: "昵称", key: "nickname" },
    { title: "账号", key: "username" },
    {
      title: "角色",
      key: "roleList",
      render: (v, r) => r.roleList.map(item => React.createElement(Tag, { color: "gold", key: item.id }, item.roleName))
    },
    {
      title: "状态",
      key: "status",
      render: getStatusRender(r => ({
        onChange: reload,
        service: SysAdminAPI.switch,
        disabled: SUPER_ADMIN_ID === r.id
      }))
    },
    { title: "创建时间", key: "createTime", render: timeRender },
    {
      title: "操作",
      fixed: "right",
      align: "center",
      render: getOperationRender(r => [
        { children: "编辑", onClick: onEdit },
        {
          disabled: SUPER_ADMIN_ID === r.id,
          popconfirmProps: { title: "确定要删除该管理员吗？", onConfirm: (v, r) => remove(r.id) },
          children: "删除"
        }
      ])
    }
  ]);
};
