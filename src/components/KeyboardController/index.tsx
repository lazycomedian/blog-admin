import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Keyboard from './components/keyboard';
import { useElementDrag } from './lib/useElementDrag';
import { KeyboardControllerWrapper } from './styled';
import keyboardSvg from './svgs/keyboard.svg';
export { default as Keyboard } from './components/keyboard';

const CACHE_KEY = '@SESSION_STORAGE/keyboardController';

let keyboardRoot: ReactDOM.Root | null = null;

const getKit = () => {
  const keyboard = document.getElementById('keyboard');
  if (keyboard) return keyboard;
  return createKit();
};

const createKit = () => {
  const keyboard = document.getElementById('keyboard');
  if (keyboard) document.body.removeChild(keyboard);

  const _self = document.createElement('div');
  _self.setAttribute('id', 'keyboard');
  document.body.appendChild(_self);
  return _self;
};

const showKeyboard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  try {
    if (keyboardRoot) return;
    keyboardRoot = ReactDOM.createRoot(getKit());
    keyboardRoot.render(<Keyboard />);
  } catch {}
};

const closeKeyboard = () => {
  if (keyboardRoot) {
    keyboardRoot.unmount();
    keyboardRoot = null;
  } else createKit();
};

interface KeyboardControllerType extends React.FC {
  show: typeof showKeyboard;
  close: typeof closeKeyboard;
}

const KeyboardController: KeyboardControllerType = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { position, mouseDownHandler } = useElementDrag({
    target: ref,
    direction: 'vertical',
    defaultValue: { right: 0, bottom: 400 },
    cacheKey: CACHE_KEY,
    onClick: e => (!keyboardRoot ? showKeyboard(e) : closeKeyboard()),
  });

  return (
    <KeyboardControllerWrapper style={{ ...position }} ref={ref} onMouseDown={mouseDownHandler}>
      <img src={keyboardSvg} alt="" style={{ width: 50 }} draggable={false} />
    </KeyboardControllerWrapper>
  );
};

KeyboardController.show = showKeyboard;
KeyboardController.close = closeKeyboard;


export default KeyboardController;