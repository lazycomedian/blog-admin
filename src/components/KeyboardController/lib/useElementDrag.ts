import { useMemoizedFn, useSessionStorageState } from 'ahooks';
import React, { useRef, useState } from 'react';

interface UseElementDragProps {
  target?: React.MutableRefObject<HTMLElement | null>;
  cacheKey?: string;
  defaultValue?: Pick<React.CSSProperties, 'top' | 'right' | 'bottom' | 'left'>;
  direction?: 'horizontal' | 'vertical' | 'all';
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const OFFSET = 30;

export const useElementDrag = (props: UseElementDragProps) => {
  const { target, cacheKey, defaultValue = { bottom: 10, right: 10 }, direction = 'all', onClick } = props;

  const [position, setPosition] = cacheKey
    ? useSessionStorageState(cacheKey, { defaultValue })
    : useState(defaultValue);

  const targetInitPostion = useRef<{ offsetLeft?: number; offsetTop?: number }>({});

  /**
   * 注册鼠标松开事件
   * @param e
   */
  const mouseUpHandler = useMemoizedFn((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    document.onmouseup = () => {
      if (onClick) {
        const finalLeft = target?.current?.offsetLeft;
        const finalTop = target?.current?.offsetTop;
        const { offsetLeft: initLeft, offsetTop: initTop } = targetInitPostion.current;

        const firstFlag =
          typeof initLeft === 'number' && typeof finalLeft === 'number' && Math.abs(finalLeft - initLeft) > OFFSET;

        const secondFlag =
          typeof initTop === 'number' && typeof finalTop === 'number' && Math.abs(finalTop - initTop) > OFFSET;
        if (!firstFlag && !secondFlag) {
          onClick(e);
        }
      }
      document.onmousemove = document.onmouseup = null;
    };
  });

  /**
   * 鼠标按下事件
   * @param e
   */
  const mouseDownHandler = useMemoizedFn((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!target?.current) return;
    const offsetX = e.pageX - target.current.offsetLeft;
    const offsetY = e.pageY - target.current.offsetTop;

    targetInitPostion.current = { offsetLeft: target.current.offsetLeft, offsetTop: target.current.offsetTop };

    document.onmousemove = e => {
      if (!target.current) return;
      let x: number | undefined;
      let y: number | undefined;

      // e.pageX - offsetX  鼠标在页面上的位置 - 鼠标在元素中的偏移位置  得到的是元素相对于页面左上角的偏移位置
      if (direction === 'all' || direction === 'horizontal') {
        if (e.pageX - offsetX > 0) {
          // 元素相对于页面左上角的偏移位置 大于0时
          if (e.pageX - offsetX > document.documentElement.clientWidth - target.current.clientWidth) {
            // 元素相对于页面左上角的偏移位置 移出到页面以外（右侧）
            x = document.documentElement.clientWidth - target.current.clientWidth; // 60是元素自身的宽高
          } else {
            x = e.pageX - offsetX;
          }
        } else {
          // 元素移到到页面以外（左侧）
          x = 0;
        }
      }

      if (direction === 'all' || direction === 'vertical') {
        if (e.pageY - offsetY > 0) {
          if (e.pageY - offsetY > document.documentElement.clientHeight - target.current.clientHeight) {
            // 元素移动到页面以外（底部）
            y = document.documentElement.clientHeight - target.current.clientHeight;
          } else {
            y = e.pageY - offsetY;
          }
        } else {
          // 元素移动到页面以外（顶部）
          y = 0;
        }
      }

      setPosition({ left: x, top: y });
    };

    mouseUpHandler(e);
  });

  return { mouseDownHandler, position };
};
