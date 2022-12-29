import { CommonStatusEnum } from "@/constants";

export interface SysAdminModel {
  /**
   * 管理员id
   */
  id: number;
  /**
   * 管理员账号
   */
  username: string;
  /**
   * 管理员名称
   */
  nickname: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 状态 0：不可用 1:可用
   */
  status: CommonStatusEnum;
  /**
   * 创建时间
   */
  createTime: string;
}

export interface SysAdminQueryVO extends IPage, Partial<Pick<SysAdminModel, "nickname" | "status">> {}
