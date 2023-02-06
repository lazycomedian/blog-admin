import { CommonStatusEnum } from "@/enums";
import { QueryModel, QueryPageModel, SaveOrUpdateModel } from "@/model/common";
import { SysAdminModel, SysMenuModel, SysRoleModel, UserMenuModel } from "@/model/settings";
import { bizRequest } from "@/utils";

/** 角色管理接口 */
export const SysRoleAPI = <const>{
  /**
   * 全量获取角色列表
   */
  list: () => bizRequest.get<SysRoleModel[]>("/sysRole"),
  /**
   * 条件查询角色列表
   * @param query
   */
  queryList: (query?: QueryPageModel) => bizRequest.get<PageResult<SysRoleModel>>("/sysRole/queryList", query),
  /**
   * 添加或修改角色
   * @param query
   */
  saveOrUpdate: (query: SaveOrUpdateModel<SysRoleModel>) => bizRequest.post<boolean>("/sysRole", query),
  /**
   * 修改角色状态
   * @param id
   * @param status 目标状态
   */
  switch: (id: number, status: CommonStatusEnum) => bizRequest.put<boolean>(`/sysRole/${id}/${status}`),
  /**
   * 删除角色
   * @param id
   */
  remove: (id: number) => bizRequest.delete<boolean>(`/sysRole/${id}`)
};

/** 管理员列表接口 */
export const SysAdminAPI = <const>{
  /**
   * 条件查询列表
   * @param query
   */
  queryList: (query?: QueryPageModel) => bizRequest.get<PageResult<SysAdminModel>>("/sysAdmin/queryList", query),
  /**
   * 添加或修改管理员
   * @param query
   */
  saveOrUpdate: (query: SaveOrUpdateModel<SysAdminModel>) => bizRequest.post<boolean>("/sysAdmin", query),
  /**
   * 修改管理员状态
   * @param id
   * @param status 目标状态
   */
  switch: (id: number, status: CommonStatusEnum) => bizRequest.put<boolean>(`/sysAdmin/${id}/${status}`),
  /**
   * 删除管理员
   * @param id
   */
  remove: (id: number) => bizRequest.delete<boolean>(`/sysAdmin/${id}`)
};

/** 菜单管理接口 */
export const SysMenuAPI = <const>{
  /**
   * 全量获取菜单列表
   * @param query
   */
  list: (query?: QueryModel) => bizRequest.get<SysMenuModel[]>("/sysMenu", query),
  /**
   * 条件查询菜单列表
   * @param query
   */
  queryList: (query?: QueryPageModel) => bizRequest.get<PageResult<SysMenuModel>>("/sysMenu/queryList", query),
  /**
   * 添加或修改菜单
   * @param query
   */
  saveOrUpdate: (query: SaveOrUpdateModel<SysMenuModel>) => bizRequest.post<boolean>("/sysMenu", query),
  /**
   * 修改菜单状态
   * @param id
   * @param status
   */
  switch: (id: number, status: CommonStatusEnum) => bizRequest.put<boolean>(`/sysMenu/${id}/${status}`),
  /**
   * 删除菜单
   * @param id
   */
  remove: (id: number) => bizRequest.delete<boolean>(`/sysMenu/${id}`),
  /**
   * 获取用户菜单列表数据
   */
  getUserMenu: () => bizRequest.get<UserMenuModel[]>("/user/menu")
};
