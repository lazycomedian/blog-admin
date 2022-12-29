import _ from "lodash";

/**
 * 映射格式化对象
 *
 * @param template 格式化的模板及初始值
 * @param source 需要映射的源数据对象
 */
export function formatAssign<T extends Object = AnyObject>(template: T, source?: AnyObject) {
  if (!source) return template;
  const result = _.cloneDeep(template);
  for (const key in result) {
    if (key in source && typeof source[key] !== "undefined" && source[key] !== null) {
      result[key] = source[key];
    }
  }
  return result;
}
