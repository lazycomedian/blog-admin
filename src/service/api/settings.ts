import { CommonStatusEnum } from "@/constants";
import { QueryModel, QueryPageModel, SaveOrUpdateModel } from "@/model/common";
import { SysAdminModel, SysMenuModel, SysRoleModel } from "@/model/settings";
import { bizRequest } from "..";

/**
 * 角色管理接口
 */
export class SysRoleService {
  /**
   * 全量获取角色列表
   */
  public static findAll() {
    return bizRequest.get<SysRoleModel[]>("/admin/sysRole");
  }

  /**
   * 条件查询角色列表
   *
   * @param query
   */
  public static queryList(query?: QueryPageModel) {
    return bizRequest.get<PageResult<SysRoleModel>>("/admin/sysRole/queryList", query);
  }

  /**
   * 添加或修改角色
   *
   * @param query
   */
  public static saveOrUpdate(query: SaveOrUpdateModel<SysRoleModel>) {
    return bizRequest.post("/admin/sysRole", query);
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
    return bizRequest.delete(`/admin/sysRole/${id}`);
  }
}

/**
 * 管理员列表接口
 */
export class SysAdminService {
  /**
   * 全量获取管理员列表
   */
  public static findAll() {
    return bizRequest.get<SysAdminModel[]>("/admin/sysAdmin");
  }

  /**
   * 条件查询列表
   *
   * @param query
   */
  public static queryList(query?: QueryPageModel) {
    return bizRequest.get<PageResult<SysAdminModel>>("/admin/sysAdmin/queryList", query);
  }

  /**
   * 添加或修改管理员
   *
   * @param query
   */
  public static saveOrUpdate(query: SaveOrUpdateModel<SysAdminModel>) {
    return bizRequest.post("/admin/sysAdmin", query);
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
    return bizRequest.delete(`/admin/sysAdmin/${id}`);
  }
}

/**
 * 菜单管理接口
 */
export class SysMenuService {
  /**
   * 全量获取菜单列表
   *
   * @param query
   */
  public static findAll(query?: QueryModel) {
    return bizRequest.get<SysMenuModel[]>("/admin/sysMenu", query);
  }

  /**
   * 条件查询菜单列表
   *
   * @param query
   */
  public static queryList(query?: QueryPageModel) {
    return bizRequest.get<PageResult<SysMenuModel>>("/admin/sysMenu/queryList", query);
  }

  /**
   * 添加或修改菜单
   *
   * @param query
   */
  public static saveOrUpdate(query: SaveOrUpdateModel<SysMenuModel>) {
    return bizRequest.post("/admin/sysMenu", query);
  }

  /**
   * 修改菜单状态
   *
   * @param id
   * @param status
   */
  public static switch(id: number, status: CommonStatusEnum) {
    return bizRequest.put(`/admin/sysMenu/${id}/${status}`);
  }

  /**
   * 删除菜单
   *
   * @param id
   */
  public static remove(id: number) {
    return bizRequest.delete(`/admin/sysMenu/${id}`);
  }
}
