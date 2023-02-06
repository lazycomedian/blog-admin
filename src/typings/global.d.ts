/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg-icons/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_PORT: number;
  readonly VITE_PROXY_APS: string;
  readonly VITE_ICONFONT_SCRIPT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare type AnyObject = Record<any, any>;

declare const __APP_VERSION__: string;
declare const __ISDEV__: boolean;
declare const __ISPROD__: boolean;

declare interface IResponse<Data = any> {
  /**
   * 响应数据
   */
  data: Data;
  /**
   * 状态码
   */
  readonly code: number;
  /**
   * 提示信息
   */
  readonly message: string;
}

declare interface IPage {
  /**
   * 当前页码
   */
  current?: number;
  /**
   * 每页条数
   */
  pageSize?: number;
}

declare interface PageResult<T> extends Required<IPage> {
  /**
   * 条目总数
   */
  total: number;
  /**
   * 列表数据
   */
  list: Array<T>;
}
