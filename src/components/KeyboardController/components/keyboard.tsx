import { CloseSquareFilled } from '@ant-design/icons';
import { useEventListener, useMemoizedFn, useResetState, useUpdateEffect } from 'ahooks';
import { Col, Row } from 'antd';
import React, { useRef } from 'react';
import KeyboardController from '..';
import { KeyCodeEnum } from '../lib/constant';
import { useElementDrag } from '../lib/useElementDrag';
import { KeyboardWrapper } from '../styled';
import leftArrSvg from '../svgs/left.svg';
import rollbackSvg from '../svgs/rollback.svg';
import KeyboardButton from './KeyboardButton';

const CACHE_KEY = '@SESSION_STORAGE/keyboard';

const Keyboard: React.FC<{ event?: React.MouseEvent<HTMLDivElement, MouseEvent> }> = props => {
  const activeInputRef = useRef<HTMLInputElement>();

  const keyboardRef = useRef<HTMLDivElement>(null);

  const [value, setValue, resetValue] = useResetState<string>('');

  const [cursorIndex, setCursorIndex, resetCursorIndex] = useResetState<number | null>(0);

  useUpdateEffect(() => {
    if (activeInputRef.current) {
      activeInputRef.current.value = value;
      const event = new InputEvent('input', { bubbles: true });
      activeInputRef.current.dispatchEvent(event);
      activeInputRef.current.setSelectionRange(cursorIndex, cursorIndex);
    }
  }, [value]);

  useEventListener('click', e => findFocusElement(e), { target: document.body });

  const { position, mouseDownHandler } = useElementDrag({ target: keyboardRef, cacheKey: CACHE_KEY });

  const findFocusElement = useMemoizedFn((e: MouseEvent) => {
    try {
      const target = e.target as Element | null;
      if (document.activeElement?.tagName === 'INPUT') {
        activeInputRef.current = document.activeElement as HTMLInputElement;
        setValue(activeInputRef.current.value || '');
        setCursorIndex(activeInputRef.current.selectionEnd);
      }
    } catch (error) {}
  });

  /**
   * 输入操作
   */
  const typing = useMemoizedFn((key: string) => {
    if (!activeInputRef.current) return;
    setValue(prev => {
      if (typeof cursorIndex === 'number') {
        setCursorIndex(cursorIndex + 1);
        return prev.substring(0, cursorIndex) + key + prev.substring(cursorIndex);
      }
      return prev + key;
    });
  });

  /**
   * 删除操作
   */
  const deleteValue = useMemoizedFn(() => {
    if (!activeInputRef.current) return;
    setValue(prev => {
      if (typeof cursorIndex === 'number') {
        const list = prev.split('');
        if (cursorIndex > 0) {
          setCursorIndex(cursorIndex - 1);
          list.splice(cursorIndex - 1, 1);
        }
        return list.join('');
      }
      return prev.slice(0, -1);
    });
  });

  /**
   * 模拟键盘指令派发
   * @param key 键名称
   * @param {KeyCode} keyCode 键对应keyCode
   */
  const keyPress = useMemoizedFn((key: string, keyCode: KeyCodeEnum, code = key, which = keyCode) => {
    if (!activeInputRef.current) return;
    const event = new KeyboardEvent('keydown', { bubbles: true, key, code, which, keyCode });
    document.dispatchEvent(event);
  });

  return (
    <KeyboardWrapper ref={keyboardRef} style={{ ...position }} onMouseDown={e => e.preventDefault()}>
      <div className="drag_bar" onMouseDown={mouseDownHandler}></div>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <KeyboardButton gray onClick={() => keyPress('Escape', KeyCodeEnum.Escape)}>
            Esc
          </KeyboardButton>
        </Col>
        <Col span={6}>
          <KeyboardButton
            onClick={() => {
              resetValue();
              resetCursorIndex();
            }}
          >
            <img src={rollbackSvg} style={{ width: 30 }} alt="" />
          </KeyboardButton>
        </Col>
        <Col span={6}>
          <KeyboardButton onClick={() => KeyboardController.close()}>
            <CloseSquareFilled style={{ color: '#c85d3a' }} />
          </KeyboardButton>
        </Col>
        <Col span={6}>
          <KeyboardButton gray>F1</KeyboardButton>
        </Col>
        <Col span={6}>
          <KeyboardButton gray>F2</KeyboardButton>
        </Col>
        <Col span={6}>
          <KeyboardButton gray>F3</KeyboardButton>
        </Col>
        <Col span={6}>
          <KeyboardButton gray onClick={() => keyPress('F4', KeyCodeEnum.F4)}>
            F4
          </KeyboardButton>
        </Col>

        <Col span={18}>
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('7')}>
                7
              </KeyboardButton>
            </Col>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('8')}>
                8
              </KeyboardButton>
            </Col>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('9')}>
                9
              </KeyboardButton>
            </Col>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('4')}>
                4
              </KeyboardButton>
            </Col>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('5')}>
                5
              </KeyboardButton>
            </Col>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('6')}>
                6
              </KeyboardButton>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <KeyboardButton fillHeight longPress onClick={deleteValue}>
            <img src={leftArrSvg} style={{ width: 36 }} alt="" />
          </KeyboardButton>
        </Col>

        <Col span={18}>
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('1')}>
                1
              </KeyboardButton>
            </Col>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('2')}>
                2
              </KeyboardButton>
            </Col>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('3')}>
                3
              </KeyboardButton>
            </Col>
            <Col span={16}>
              <KeyboardButton longPress onClick={() => typing('0')}>
                0
              </KeyboardButton>
            </Col>
            <Col span={8}>
              <KeyboardButton longPress onClick={() => typing('.')}>
                .
              </KeyboardButton>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <KeyboardButton gray fillHeight onClick={() => keyPress('Enter', KeyCodeEnum.Enter)}>
            Enter
          </KeyboardButton>
        </Col>
      </Row>
      <div className="drag_bar_bottom" onMouseDown={mouseDownHandler}></div>
      {/* <img className="keyboard_close" src={keyboardCloseSvg} alt="close" onClick={() => KeyboardController.close()} /> */}
    </KeyboardWrapper>
  );
};

export default Keyboard;
