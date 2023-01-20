import { StatusCodeEnum, StorageKeyEnum } from "@/enums";
import { Logger, Storage } from "@sentimental/toolkit";
import { message, notification } from "antd";
import dayjs from "dayjs";
import zhCN from "dayjs/locale/zh-cn";
import { BizRequest } from "./request";
export { default as dayjs } from "dayjs";

dayjs.locale(zhCN);

/**
 * 本地存储序列化数据，默认为sessionStorage
 * @default "sessionStorage"
 *
 * @example 如需要localStorage可在各个方法中入参
 * storage.getItem('key','localStorage')
 *
 * @example 或者创建新的localStorage实例
 * new CacheStorage({ defaultType: "localStorage" })
 */
export const storage = new Storage<StorageKeyEnum>({
  name: import.meta.env.VITE_APP_TITLE,
  mode: import.meta.env.MODE,
  type: "localStorage"
});

/**
 * Antd Message的代理对象
 * 调用时会自动销毁所有message实例
 */
export const tips = new Proxy(message, {
  get: (target, key) => {
    target.destroy();
    return Reflect.get(target, key);
  }
});

/**
 * Antd Notification的代理对象
 * 调用时会自动销毁所有notification实例
 */
export const notice = new Proxy(notification, {
  get: (target, key) => {
    target.destroy();
    return Reflect.get(target, key);
  }
});

/**
 * 控制台输出日志实例
 */
export const logger = new Logger(`${import.meta.env.VITE_APP_TITLE} MODE:${import.meta.env.MODE.toUpperCase()}`);

/**
 * 业务逻辑请求实例
 */
export const bizRequest = new BizRequest({
  timeout: 15000,
  withCredentials: true,
  baseURL: "/api",
  code: StatusCodeEnum.SUCCESS
});
