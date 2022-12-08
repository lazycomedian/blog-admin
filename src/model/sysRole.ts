import { CommonStatusEnum } from "@/constants";

export interface SysRoleModel {
  id: number;
  roleName: string;
  // roleLabel: string;
  status: CommonStatusEnum;
  createTime: string;
}

export interface SysRoleQueryModel extends Partial<IPage> {
  roleName?: string;
  status?: string;
}
