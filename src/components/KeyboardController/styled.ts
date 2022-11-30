import styled from "styled-components";

export const KeyboardWrapper = styled.div`
  position: fixed;
  background-color: rgba(198, 207, 225, 0.898);
  z-index: 10000;
  padding: 10px;
  padding-top: 30px;
  padding-bottom: 20px;
  user-select: none;
  width: 400px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);

  .drag_bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }

  .drag_bar_bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 20px;
    width: 100%;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }

  .keyboard_close {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 43px;
    height: 43px;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }
`;


export interface KeyboardButtonWrapperProps {
  gray?: boolean;
  fillHeight?: boolean;
}

export const KeyboardButtonWrapper = styled.div<KeyboardButtonWrapperProps>`
  font-size: 30px;
  width: 100%;
  height: ${p => (p.fillHeight ? '100%' : '80px')};
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 1px 0px 0px rgb(0 0 0 / 40%);
  border-radius: 5px;
  color: ${p => (p.gray ? 'gray' : '#000000')};
  cursor: pointer;
  transition: all 0.1s;

  &:active {
    background: #a4afc8;
  }
`;

export const KeyboardControllerWrapper = styled.div<{ active?: boolean }>`
  user-select: none;
  position: absolute;
  right: 0;
  bottom: 400px;
  z-index: 9999;
  transform: translateX(${p => (p.active ? '0' : '40px')});
  transition: transform 0.2s;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 66px;

  &:hover {
    transform: translateX(0);
  }
`;
