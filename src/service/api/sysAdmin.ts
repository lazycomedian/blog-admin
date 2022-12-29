import { CommonStatusEnum } from "@/constants";
import { SysAdminModel, SysAdminQueryVO } from "@/model/sysAdmin";
import { bizRequest } from "..";

/**
 * 管理员管理接口
 */
export class SysAdminService {
  /**
   * 获取数据全列表
   */
  public static list() {
    return bizRequest.get<SysAdminModel[]>("/admin/sysAdmin");
  }

  /**
   * 条件查询列表
   *
   * @param query
   */
  public static queryList(query?: SysAdminQueryVO) {
    return bizRequest.get<PageResult<SysAdminModel>>("/admin/sysAdmin/queryList", query);
  }

  /**
   * 创建管理员
   *
   * @param query
   */
  public static create(query: Omit<SysAdminModel, "createTime" | "id">) {
    return bizRequest.post("/admin/sysAdmin", query);
  }

  /**
   * 编辑管理员
   *
   * @param id
   * @param query
   */
  public static modify(id: number, query: Omit<SysAdminModel, "createTime" | "id">) {
    return bizRequest.post("/admin/sysAdmin", { ...query, id });
  }

  /**
   * 修改管理员状态
   *
   * @param id
   * @param status
   */
  public static switch(id: number, status: CommonStatusEnum) {
    return bizRequest.put(`/admin/sysAdmin/${id}/${status}`);
  }

  /**
   * 删除管理员
   *
   * @param id
   */
  public static remove(id: number) {
    return bizRequest.delete(`admin/sysAdmin/${id}`);
  }
}
