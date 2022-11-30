import { codeMessage } from "@/constants/exception";
import { StatusCodeEnum } from "@/constants/http.enum";
import { message, notification } from "antd";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from "axios";
import AxiosCanceler from "./canceler";
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

  constructor(config: BizRequestConfig, private readonly canceler = new AxiosCanceler()) {
    this.autoCancel = config.autoCancel ?? true;
    this.instance = axios.create(config);
    this.createInterceptors();
  }

  /**
   * 创建拦截器中间间
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
        const { data = {}, config } = response;

        // 在请求结束后，移除本次请求
        this.canceler.remove(config);

        // 登录失效（code == 40001）
        if ("code" in data && data.code === StatusCodeEnum.NO_LOGIN) {
          window.location.hash = "/login";
          return Promise.reject(data.message || "未知错误");
        }

        return response;
      },
      (error: AxiosError) => {
        const { response } = error;
        NProgress.done();

        // 请求超时单独判断，请求超时没有 response
        if (error.message.includes("timeout")) message.error("请求超时，请稍后再试");

        // 根据响应的错误状态码，做不同的处理
        if (response) BizRequest.checkStatus(response.status, response.statusText);

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
    return async <Data = any>(url: string, data?: any, options: Omit<BizRequestConfig<Data>, "method"> = {}) => {
      if (method.toLowerCase() === "get") data = { params: data };
      else data = { data };

      const { code = StatusCodeEnum.SUCCESS, ...restOptions } = options;

      const res = await this.instance({ url, ...data, ...restOptions, method });
      const response: IResponse = res.data;
      // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
      if (response.code !== code) throw new Error(response.message);
      return response.data as Data;
    };
  }

  /**
   * 校验网络请求状态码
   * @param status
   * @param msg
   */
  private static checkStatus(status: number | undefined | null, msg?: string) {
    if (!status) return;
    message.destroy();
    notification.error({ message: status, description: codeMessage[status] || msg });
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
