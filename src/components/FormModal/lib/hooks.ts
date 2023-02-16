import { ModalTypeEnum } from "@/enums";
import { useMemoizedFn } from "ahooks";
import { useMemo, useRef, useState } from "react";
import type { FormModalRef, UseFormModalRef } from "./types";

/**
 * 弹窗控制器
 *
 * @param initialRecord 需要暂存记录值的初始值
 */
export const useFormModalRef: UseFormModalRef = initialRecord => {
  // 当前暂存的记录值
  const [record, setRecord] = useState(initialRecord);

  const ref = useRef<FormModalRef>(null);

  const show = useMemoizedFn<ReturnType<UseFormModalRef>["show"]>((modalType = ModalTypeEnum.ADD, record) => {
    setRecord(Object.assign({}, initialRecord, record));
    ref.current?.show(modalType);
  });

  return useMemo(
    () =>
      Object.assign(ref, {
        record,
        show,
        close: () => ref.current?.close(),
        getModalType: () => ref.current?.modalType || ModalTypeEnum.ADD
      }),
    [record]
  );
};
