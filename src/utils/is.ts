/**
 * 判断值是否未某个类型
 * @param val
 * @param type js类型字符串形式
 */
export function is(val: unknown, type: string) {
	return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * 是否为函数
 * @param val
 */
export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, "Function");
}

/**
 * 是否已定义
 * @param val
 */
export function isDef<T = unknown>(val?: T): val is T {
	return typeof val !== "undefined";
}

/**
 * 是否是未定义
 * @param val
 */
export function isUndef<T = unknown>(val?: T): val is T {
	return !isDef(val);
}

/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
	return val !== null && is(val, "Object");
};

/**
 * 是否为时间
 * @param val
 */
export function isDate(val: unknown): val is Date {
	return is(val, "Date");
}

/**
 * 是否为数字
 * @param val
 */
export function isNumber(val: unknown): val is number {
	return is(val, "Number");
}

/**
 * 是否为异步方法
 * @param val
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
	return is(val, "AsyncFunction");
}

/**
 * 是否为promise
 * @param val
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
	return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * 是否为字符串
 * @param val
 */
export function isString(val: unknown): val is string {
	return is(val, "String");
}

/**
 * 是否为布尔值
 * @param val
 */
export function isBoolean(val: unknown): val is boolean {
	return is(val, "Boolean");
}

/**
 * 是否为数组
 * @param val
 */
export function isArray(val: any): val is any[] {
	return val && Array.isArray(val);
}

/**
 * 当前运行环境是否为客户端
 */
export function isClient() {
	return typeof window !== "undefined";
}

/**
 * 是否为浏览器
 * @param val
 */
export function isWindow(val: any): val is Window {
	return typeof window !== "undefined" && is(val, "Window");
}

export function isElement(val: unknown): val is Element {
	return isObject(val) && !!val.tagName;
}

export const isServer = typeof window === "undefined";

/**
 * 是否为图片节点
 * @param o
 */
export function isImageDom(o: Element) {
	return o && ["IMAGE", "IMG"].includes(o.tagName);
}

export function isNull(val: unknown): val is null {
	return val === null;
}

/**
 * 不为null并且不为undefined
 * @param val
 */
export function isNullAndUnDe(val: unknown): val is null | undefined {
	return isUndef(val) && isNull(val);
}

/**
 * 不为null或者不为undefined
 * @param val
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
	return isUndef(val) || isNull(val);
}
