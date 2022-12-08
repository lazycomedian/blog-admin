import { CommonStatusEnum } from "@/constants";
import { SysRoleModel, SysRoleQueryModel } from "@/model/sysRole";
import { bizRequest } from "..";

/**
 * 角色管理接口
 */
export class SysRoleService {
  static list() {
    return bizRequest.get<SysRoleModel[]>("/admin/sysRole");
  }

  static queryList(query?: SysRoleQueryModel) {
    return bizRequest.get<PageResult<SysRoleModel>>("/admin/sysRole/queryList", query);
  }

  static create(query: Omit<SysRoleModel, "createTime" | "id">) {
    return bizRequest.post("/admin/sysRole", query);
  }

  static modify(id: number, query: Omit<SysRoleModel, "createTime" | "id">) {
    return bizRequest.post("/admin/sysRole", { ...query, id });
  }

  static switch(id: number, status: CommonStatusEnum) {
    return bizRequest.put(`/admin/sysRole/${id}/${status}`);
  }

  static remove(id: number) {
    return bizRequest.delete(`admin/sysRole/${id}`);
  }
}
