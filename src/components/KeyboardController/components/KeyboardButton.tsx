import { useLongPress, useMemoizedFn } from 'ahooks';
import React, { memo, useRef } from 'react';
import { PRESS_DELAY } from '../lib/constant';
import { KeyboardButtonWrapper as Wrapper, KeyboardButtonWrapperProps } from '../styled';

interface KeyboardButtonProps extends React.PropsWithChildren, KeyboardButtonWrapperProps {
  onClick?: () => void;
  longPress?: boolean;
}

const KeyboardButton: React.FC<KeyboardButtonProps> = props => {
  const { children, onClick, longPress, ...wrapperProps } = props;

  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timer>();

  const longPressHandler = useMemoizedFn(() => {
    if (longPress && onClick) {
      timer.current = setInterval(onClick, 50);

      document.onmouseup = () => {
        clearInterval(timer.current);
        document.onmouseup = null;
      };
    }
  });

  useLongPress(longPressHandler, ref, { delay: PRESS_DELAY });

  return (
    <Wrapper ref={ref} {...Object.assign({ [longPress ? 'onMouseDown' : 'onClick']: onClick }, wrapperProps)}>
      {children}
    </Wrapper>
  );
};

export default memo(KeyboardButton);
