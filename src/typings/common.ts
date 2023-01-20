/** 通用弹窗控制器 */
export interface UniversalModalRef {
  /**
   * 打开弹窗
   */
  show(): void;
  /**
   * 关闭弹窗
   */
  close(): void;
}

/** 为弹窗props添加ref参数 */
export type PropsWithModalRef<R = UniversalModalRef, P = unknown> = P & { ref?: React.Ref<R> };

/** label&value为成员的键值对 */
export interface LVPair<L = string, V = any> {
  label: L;
  value: V;
}
