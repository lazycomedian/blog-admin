/** 请求成功返回状态码 */
export enum StatusCodeEnum {
  /**
   * 成功
   */
  SUCCESS = 20000,
  /**
   * 未登录
   */
  NO_LOGIN = 40001,
  /**
   * 404
   */
  NOT_FOUND = 40004,
  /**
   * 没有操作权限
   */
  UN_AUTHORIZED = 40300,
  /**
   * 系统异常
   */
  SYSTEM_ERROR = 50000,
  /**
   * 失败
   */
  FAILURE = 51000,
  /**
   * 参数校验失败
   */
  VALID_ERROR = 52000,
  /**
   * 用户名已存在
   */
  USERNAME_EXIST = 52001,
  /**
   * 用户名不存在
   */
  USERNAME_NOT_EXIST = 52002
}

/** 常见的contentTyp类型 */
export enum ContentTypeEnum {
  /**
   * json格式
   */
  JSON = "application/json;charset=UTF-8",
  /**
   * 文本格式
   */
  TEXT = "text/plain;charset=UTF-8",
  /**
   * 序列化表单格式，配合qs
   */
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  /**
   * 表单格式
   */
  FORM_DATA = "multipart/form-data;charset=UTF-8"
}
