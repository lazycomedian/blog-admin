import { useTableColumns } from "@/hooks";
import { SysAdminModel } from "@/model/sysAdmin";
import { SysAdminService } from "@/service/api";
import { UseColumns } from "@/typings/common";
import { tips } from "@/utils";
import { getOperationRender, getStatusRender, timeRender } from "@/utils/common";
import { useMemoizedFn } from "ahooks";

export const useColumns: UseColumns<SysAdminModel> = ({ reload, onEdit }) => {
  /**
   * 删除管理员
   *
   * @param id
   */
  const remove = useMemoizedFn(async (id: number) => {
    try {
      await SysAdminService.remove(id);
      tips.success("删除成功");
      reload();
    } catch (error) {
      tips.error("删除失败");
    }
  });

  return useTableColumns<SysAdminModel>([
    { title: "昵称", key: "nickname" },
    { title: "账号", key: "username" },
    { title: "角色", key: "role" },
    { title: "状态", key: "status", render: getStatusRender({ onChange: reload, service: SysAdminService.switch }) },
    { title: "创建时间", key: "createTime", render: timeRender },
    {
      title: "操作",
      fixed: "right",
      width: 180,
      align: "center",
      render: getOperationRender([
        { children: "编辑", onClick: onEdit },
        {
          popconfirmProps: { title: "确定要删除该管理员吗？", onConfirm: (v, r) => remove(r.id) },
          children: "删除"
        }
      ])
    }
  ]);
};
