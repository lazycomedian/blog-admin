import { CommonStatusEnum } from "@/constants";

export interface RoleModel {
  id: number;
  roleName: string;
  // roleLabel: string;
  status: CommonStatusEnum;
  createTime: string;
}

export interface RoleQueryModel extends Partial<IPage> {
  roleName?: string;
  status?: string;
}
