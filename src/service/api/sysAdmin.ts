import { CommonStatusEnum } from "@/constants";
import { SysAdminModel, SysAdminQueryModel } from "@/model/sysAdmin";
import { bizRequest } from "..";

/**
 * 管理员管理接口
 */
export class SysAdminService {
  static list() {
    return bizRequest.get<SysAdminModel[]>("/admin/sysAdmin");
  }

  static queryList(query?: SysAdminQueryModel) {
    return bizRequest.get<PageResult<SysAdminModel>>("/admin/sysAdmin/queryList", query);
  }

  static create(query: Omit<SysAdminModel, "createTime" | "id">) {
    return bizRequest.post("/admin/sysAdmin", query);
  }

  static modify(id: number, query: Omit<SysAdminModel, "createTime" | "id">) {
    return bizRequest.post("/admin/sysAdmin", { ...query, id });
  }

  static switch(id: number, status: CommonStatusEnum) {
    return bizRequest.put(`/admin/sysAdmin/${id}/${status}`);
  }

  static remove(id: number) {
    return bizRequest.delete(`admin/sysAdmin/${id}`);
  }
}
