import { CommonStatusEnum } from "@/constants";

export interface SysRoleModel {
  /**
   * 角色id
   */
  id: number;
  /**
   * 角色名
   */
  roleName: string;
  /**
   * 状态 0：不可用 1:可用
   */
  status: CommonStatusEnum;
  /**
   * 创建时间
   */
  createTime: string;
}

export interface SysRoleQueryVO extends IPage, Partial<Pick<SysRoleModel, "roleName" | "status">> {}
