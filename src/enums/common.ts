/** 通用状态 */
export enum CommonStatusEnum {
  /** 不可用 */
  DISABLED,
  /** 可用 */
  AVAILABLE
}

/** 业务弹窗类型 */
export enum ModalTypeEnum {
  /** 添加 */
  ADD,
  /** 编辑 */
  EDIT
}

/** 本地存储Key */
export enum StorageKeyEnum {
  TOKEN = "token",
  MENU = "menu",
  NAV_TAB = "nav_tab"
}

/** 固定路由URL配置 */
export enum CommonRouteEnum {
  /** 登录页 */
  LOGIN = "/login",
  /** 主页 */
  HOME = "/home",
  /** 用户中心 */
  USER_CENTER = "/user_center"
}
