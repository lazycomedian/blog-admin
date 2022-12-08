import { CommonStatusEnum } from "@/constants";
import { RoleModel, RoleQueryModel } from "@/model/role";
import { bizRequest } from "..";

/**
 * 角色管理接口
 */
export class RoleService {
  static list() {
    return bizRequest.get<RoleModel[]>("/admin/role");
  }

  static queryList(query?: RoleQueryModel) {
    return bizRequest.get<PageResult<RoleModel>>("/admin/role/queryList", query);
  }

  static create(query: Omit<RoleModel, "createTime" | "id">) {
    return bizRequest.post("/admin/role", query);
  }

  static modify(id: number, query: Omit<RoleModel, "createTime" | "id">) {
    return bizRequest.post("/admin/role", { ...query, id });
  }

  static switch(id: number, status: CommonStatusEnum) {
    return bizRequest.put(`/admin/role/${id}/${status}`);
  }

  static remove(id: number) {
    return bizRequest.delete(`admin/role/${id}`);
  }
}
