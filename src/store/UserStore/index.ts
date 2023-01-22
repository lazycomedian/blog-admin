import Loading from "@/components/Loading";
import { StorageKeyEnum } from "@/enums";
import { UserMenuModel } from "@/model/settings";
import { SysMenuService } from "@/service";
import { logger, storage } from "@/utils";
import { getAllPagesMap } from "@/utils/common";
import { concatString } from "@sentimental/toolkit";
import { makeAutoObservable } from "mobx";
import React from "react";
import { RouteObject } from "react-router-dom";

const pagesMap = getAllPagesMap();

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  /** 用户菜单 */
  public userMenu: UserMenuModel[] = storage.getItem(StorageKeyEnum.MENU) || [];

  /**
   * 设置用户菜单
   * @param menu
   */
  public setUserMenu(menu: UserMenuModel[] = []): void {
    this.userMenu = menu;
    storage.setItem(StorageKeyEnum.MENU, menu);
  }

  /**
   * 更新用户菜单
   * @returns 用户菜单
   */
  public async updateUserMenu(): Promise<UserMenuModel[]> {
    try {
      const list = await SysMenuService.getUserMenu();
      this.setUserMenu(list);
      return list;
    } catch (error) {
      logger.error(error);
      return [];
    }
  }

  /** 当前页面标题 */
  public layoutTitle: string = "";

  /**
   * 设置页面标题
   * @param title
   */
  public setLayoutTitle(title: string) {
    this.layoutTitle = title || "";
  }

  /** 扁平化用户菜单 */
  public get flattenUserMenu() {
    return this.getFlatUserMenu(this.userMenu);
  }

  /**
   * 获取扁平化用户菜单
   * @param menu
   */
  public getFlatUserMenu(menu: UserMenuModel[]) {
    const result: UserMenuModel[] = [];
    menu.forEach(item => {
      result.push(item);
      if (item.children?.length) result.push(...this.getFlatUserMenu(item.children));
    });
    return result.map(item => ({ ...item, fullPath: concatString(item.prefixPath, item.path) }));
  }

  /** 页面路由集合 */
  public get menuRoutes(): RouteObject[] {
    return this.getRouteObjectList(this.userMenu);
  }

  /**
   * 由用户菜单组装得到页面路由
   * @param menu 菜单数据
   */
  private getRouteObjectList(menu: UserMenuModel[]): RouteObject[] {
    return menu.map(item => {
      let element: React.ReactNode;
      const component = item.component ? pagesMap.get(item.component) : undefined;
      if (component) {
        element = React.createElement(
          React.Suspense,
          { fallback: React.createElement(Loading, { loadingDelay: 200 }) },
          React.createElement(component)
        );
      }

      return {
        id: item.id.toString(),
        path: concatString(item.prefixPath, item.path),
        element,
        children: Array.isArray(item.children) ? this.getRouteObjectList(item.children) : undefined
      };
    });
  }
}
