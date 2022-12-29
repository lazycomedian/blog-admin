import { CommonStatusEnum } from "@/constants";
import { SysRoleModel, SysRoleQueryVO } from "@/model/sysRole";
import { bizRequest } from "..";

/**
 * 角色管理接口
 */
export class SysRoleService {
  /**
   * 获取数据全列表
   */
  public static list() {
    return bizRequest.get<SysRoleModel[]>("/admin/sysRole");
  }

  /**
   * 条件查询角色列表
   *
   * @param query
   */
  public static queryList(query?: SysRoleQueryVO) {
    return bizRequest.get<PageResult<SysRoleModel>>("/admin/sysRole/queryList", query);
  }

  /**
   * 创建角色
   *
   * @param query
   */
  public static create(query: Omit<SysRoleModel, "createTime" | "id">) {
    return bizRequest.post("/admin/sysRole", query);
  }

  /**
   * 修改角色
   *
   * @param id
   * @param query
   */
  public static modify(id: number, query: Omit<SysRoleModel, "createTime" | "id">) {
    return bizRequest.post("/admin/sysRole", { ...query, id });
  }

  /**
   * 修改角色状态
   *
   * @param id
   * @param status
   */
  public static switch(id: number, status: CommonStatusEnum) {
    return bizRequest.put(`/admin/sysRole/${id}/${status}`);
  }

  /**
   * 删除角色
   *
   * @param id
   */
  public static remove(id: number) {
    return bizRequest.delete(`admin/sysRole/${id}`);
  }
}
