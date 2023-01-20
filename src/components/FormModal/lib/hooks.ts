import { ModalTypeEnum } from "@/enums";
import { useMemoizedFn } from "ahooks";
import { useRef, useState } from "react";
import type { FormModalRef, UseFormModalRef } from "./types";

/**
 * 弹窗控制器
 *
 * @param initialRecord 需要暂存记录值的初始值
 */
export const useFormModalRef: UseFormModalRef = initialRecord => {
  // 当前暂存的记录值
  const [currentRecord, setCurrentRecord] = useState(initialRecord);

  const ref = useRef<FormModalRef>(null);

  const show = useMemoizedFn<ReturnType<UseFormModalRef>["show"]>((modalType = ModalTypeEnum.ADD, record: AnyObject) => {
    setCurrentRecord(record || initialRecord);
    ref.current?.show(modalType);
  });

  return Object.assign(ref, {
    currentRecord,
    show,
    close: () => ref.current?.close(),
    getModalType: () => ref.current?.modalType || ModalTypeEnum.ADD,
    getFormInstance: () => ref.current?.getFormInstance()
  });
};
