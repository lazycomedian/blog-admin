import Iconfont from "@/components/Iconfont";
import classNames from "classnames";
import React, { forwardRef, memo } from "react";
import styled from "styled-components";

interface NavTabItemProps extends React.PropsWithChildren {
  active?: boolean;
  showClose?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  className?: string;
}

const NavTabItem = forwardRef<HTMLDivElement, NavTabItemProps>((props, ref) => {
  const { children, active, showClose = true, onClick, onClose, className } = props;

  return (
    <Wrapper className={classNames(className, { nav_tab_item_active: active })} ref={active ? ref : undefined} onClick={onClick}>
      <div className="nav_tab_item_text" style={{ color: active ? "#2d8cf0" : undefined }}>
        {children}
      </div>
      {showClose && (
        <div
          className="nav_tab_item_close"
          onClick={e => {
            e.stopPropagation();
            onClose && onClose();
          }}
        >
          <Iconfont type="sentimental-close" fontSize={12} />
        </div>
      )}
    </Wrapper>
  );
});

export default memo(NavTabItem);

const Wrapper = styled.div`
  height: 32px;
  background: #fff;
  border-radius: 3px;
  border: none;
  color: #808695;
  padding: 5px 10px 4px 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: inline-flex;
  align-items: center;
  margin-right: 6px;

  &:hover {
    .nav_tab_item_text {
      color: #515a6e;
    }
  }

  .nav_tab_item_text {
    transition: inherit;
    padding-right: 4px;
  }

  .nav_tab_item_close {
    width: 22px;
    height: 22px;
    line-height: 20px;
    text-align: center;
    color: #999;
    transition: inherit;

    &:hover {
      color: #444;
    }
  }
`;
