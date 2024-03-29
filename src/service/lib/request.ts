import { StatusCodeEnum } from "@/enums/http";
import { message } from "antd";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from "axios";
import AxiosCanceler from "./canceler";
import { checkStatus } from "./constant";
import NProgress from "./nprogress";

interface BizRequestConfig<D = any> extends AxiosRequestConfig<D> {
  /**
   * 自动取消重复的请求，可通过设置该属性为false以允许重复请求的发送
   * @default true
   */
  autoCancel?: boolean;
  /**
   * 正确返回数据的状态码
   */
  code?: number;
}

export class BizRequest {
  private readonly instance: AxiosInstance;

  private readonly autoCancel: boolean;

  constructor(
    config: BizRequestConfig = { withCredentials: true },
    private readonly canceler: AxiosCanceler = new AxiosCanceler()
  ) {
    this.autoCancel = config.autoCancel ?? true;
    this.instance = axios.create(config);
    this.createInterceptors();
  }

  /**
   * 创建拦截器
   */
  private createInterceptors(): void {
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     */
    this.instance.interceptors.request.use(
      (config: BizRequestConfig) => {
        NProgress.start();

        // 存在未完成的重复请求先取消该重复请求
        if (config.autoCancel || (config.autoCancel === undefined && this.autoCancel)) {
          this.canceler.cancel(config);
        }
        // 将当前请求添加到 pending中
        this.canceler.add(config);

        return config;
      },
      error => Promise.reject(error)
    );

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.instance.interceptors.response.use(
      response => {
        NProgress.done();
        const { data, config } = response;

        // 在请求结束后，移除本次请求
        this.canceler.remove(config);

        // 登录失效（code == 40001）
        if (data.code === StatusCodeEnum.NO_LOGIN) {
          message.error(data.msg);
          window.location.hash = "/login";
          return Promise.reject(data);
        }

        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== StatusCodeEnum.SUCCESS) {
          return Promise.reject(data);
        }

        return data;
      },
      (error: AxiosError) => {
        const { response } = error;
        NProgress.done();

        // 请求超时单独判断，请求超时没有 response
        if (error.message.includes("timeout")) message.error("请求超时，请稍后再试");

        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);

        // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) window.location.hash = "/500";

        return Promise.reject(error);
      }
    );
  }

  /**
   * 统一请求返回结构
   * @param method 请求方法
   */
  protected request(method: Method) {
    return <Data = any>(url: string, data?: any, options: Omit<BizRequestConfig<Data>, "method"> = {}) => {
      if (method.toLowerCase() === "get") data = { params: data };
      else data = { data };

      const { code = StatusCodeEnum.SUCCESS, ...restOptions } = options;

      return this.instance({ url, ...data, ...restOptions, method });
    };
  }

  public get cancelAll() {
    return this.canceler.cancelAll;
  }

  public get get() {
    return this.request("GET");
  }

  public get post() {
    return this.request("POST");
  }

  public get put() {
    return this.request("PUT");
  }

  public get delete() {
    return this.request("DELETE");
  }
}
