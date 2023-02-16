import { BaseModel } from "./common";

// <---------------------- 角色管理模型 ----------------------> //

export interface SysRoleModel extends BaseModel {
  /**
   * 角色名
   */
  roleName: string;
  /**
   * 关联的菜单列表
   */
  menuList: { id: number; menuName: string }[];
  /**
   * 关联的菜单ids
   */
  menuIds?: number[];
}

// <---------------------- 管理员管理模型 ----------------------> //

export interface SysAdminModel extends BaseModel {
  /**
   * 管理员账号
   */
  username: string;
  /**
   * 管理员名称
   */
  nickname: string;
  /**
   * 关联的角色列表
   */
  roleList: { id: number; roleName: string }[];
  /**
   * 关联的角色ids
   */
  roleIds?: number[];
}

// <---------------------- 菜单管理模型 ----------------------> //
export interface SysMenuModel extends BaseModel {
  /**
   * 名称
   */
  name: string;
  /**
   * 路由
   */
  path: string;
  /**
   * 父级页面路由
   */
  prefixPath?: string;
  /**
   * 组件路径
   */
  component?: string;
  /**
   * 图标
   */
  icon: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 是否显示
   */
  visible: number;
  /**
   * 父级id
   */
  pid?: number;
  /**
   * 子菜单列表
   */
  children?: SysMenuModel[];
}

export interface UserMenuModel
  extends BaseModel,
    Pick<SysMenuModel, "name" | "path" | "component" | "icon" | "prefixPath" | "visible" | "pid"> {
  /**
   * 用户子菜单列表
   */
  children?: UserMenuModel[];
}
