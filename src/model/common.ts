import { CommonStatusEnum } from "@/enums";

/** 常用字段基类型模型 */
export interface BaseModel {
  /**
   * 主键id
   */
  id: number;
  /**
   * 状态 0:不可用 1:可用
   */
  status: CommonStatusEnum;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 更新时间
   */
  // updateTime: string;
}

/** 通用查询模型 */
export interface QueryModel {
  /**
   * 查询内容
   */
  content?: string;
  /**
   * 状态 0:不可用 1:可用
   */
  status?: CommonStatusEnum;
}

/** 通用分页查询模型 */
export interface QueryPageModel extends QueryModel, IPage {}

/** 通用添加或修改模型 */
export type SaveOrUpdateModel<T extends BaseModel> = Omit<T, "id" | "createTime"> & {
  /**
   * 主键id
   */
  id?: number;
};
