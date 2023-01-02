import axios, { AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";

export default class AxiosCanceler {
  protected readonly cancelers: Map<string, Canceler> = new Map();

  /**
   * 获取序列化参数路径
   *
   * @param config
   */
  protected static getPathKey(config: AxiosRequestConfig): string {
    return [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");
  }

  /**
   * 添加取消请求方法
   *
   * @param config
   */
  public add(config: AxiosRequestConfig): void {
    // 在请求开始前，对之前的请求做检查取消操作
    this.remove(config);

    const key = AxiosCanceler.getPathKey(config);

    if (!config.cancelToken && !this.cancelers.has(key)) {
      // 如果在集合中不存在当前请求，则添加
      const { token, cancel } = axios.CancelToken.source();

      config.cancelToken = token;
      this.cancelers.set(key, cancel);
    }
  }

  /**
   * 移除未完成的请求
   *
   * @param config
   */
  public remove(config: AxiosRequestConfig): void {
    const key = AxiosCanceler.getPathKey(config);
    if (this.cancelers.has(key)) this.cancelers.delete(key);
  }

  /**
   * 取消未完成的请求并移除
   *
   * @param config
   * @param message
   */
  public cancel(config: AxiosRequestConfig, message?: string) {
    const key = AxiosCanceler.getPathKey(config);
    if (this.cancelers.has(key)) {
      const cancel = this.cancelers.get(key);
      cancel && cancel(message);

      this.cancelers.delete(key);
    }
  }

  /**
   * 取消未完成的所有请求
   */
  public cancelAll(): void {
    this.cancelers.forEach(cancel => {
      cancel && cancel("尚未未完成的请求");
    });
    this.cancelers.clear();
  }
}
