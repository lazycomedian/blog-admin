import { AxiosError, Request, RequestConfig, RequestResponse } from "@sentimental/request";
import { notice } from ".";

interface BizRequestConfig extends RequestConfig {
  /**
   * 正确返回数据的状态码，与响应数据返回不匹配时会抛出错误
   *
   * 在实例化时加入默认的响应数据状态码
   * @example new BizRequest({ code: 200 });
   *
   * 具体请求调用时传入的code优先级为最高
   * @example request.get("/api/xxx", {}, { code: 200 })
   */
  code?: number;
}

export class BizRequest extends Request<BizRequestConfig, IResponse> {
  protected override onRejectedResponseInterceptor(error: AxiosError) {
    // 请求超时单独判断，请求超时没有 response
    if (error.code === "ECONNABORTED") {
      notice.error({ message: "请求超时", description: "网络延迟较大，请稍后再试" });
      return Promise.reject(null);
    }

    // 根据响应的错误状态码，做不同的处理
    if (error.response) {
      const { status, statusText } = error.response;
      notice.error({
        message: status,
        description: formatStatusZhCN(status) || statusText
      });
      return Promise.reject(null);
    }

    return Promise.reject(error);
  }

  protected override onFulfilledResponseInterceptor(response: RequestResponse<BizRequestConfig, IResponse>) {
    const { config, data } = response;
    if (data.code !== config.code) return Promise.reject(data.message);
    return data.data;
  }
}

function formatStatusZhCN(status: number | null | undefined): string {
  switch (status) {
    case 200:
      return "服务器成功返回请求的数据。";
    case 201:
      return "新建或修改数据成功。";
    case 202:
      return "一个请求已经进入后台排队（异步任务）。";
    case 204:
      return "删除数据成功。";
    case 400:
      return "发出的请求有错误,服务器没有进行新建或修改数据的操作。";
    case 401:
      return "用户没有权限（令牌、用户名、密码错误）。";
    case 403:
      return "用户得到授权,但是访问是被禁止的。";
    case 404:
      return "发出的请求针对的是不存在的记录,服务器没有进行操作。";
    case 406:
      return "请求的格式不可得。";
    case 410:
      return "请求的资源被永久删除,且不会再得到的。";
    case 422:
      return "当创建一个对象时,发生一个验证错误。";
    case 500:
      return "服务器发生错误,请检查服务器。";
    case 502:
      return "服务器重连中,请稍后再试。";
    case 503:
      return "服务不可用,服务器暂时过载或维护。";
    case 504:
      return "网关超时。";
    default:
      return "";
  }
}
