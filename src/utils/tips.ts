import { message } from "antd";

/**
 * 自动销毁上次调用的antd message
 *
 */
export const tips = new Proxy(message, {
  get: (target, key) => {
    target.destroy();
    return Reflect.get(target, key);
  }
});
