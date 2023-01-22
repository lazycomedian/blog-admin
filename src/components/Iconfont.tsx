import { IconfontType } from "@/typings/common";
import { createFromIconfontCN } from "@ant-design/icons";
import { isNumber } from "@sentimental/toolkit";
import React, { memo } from "react";
import styled from "styled-components";

interface IconfontProps extends Pick<React.CSSProperties, "color" | "fontSize"> {
  type: IconfontType;
  className?: string;
  style?: React.CSSProperties;
  rotate?: number;
}

const Iconfont: React.FC<IconfontProps> = ({ type, className, style, fontSize, color, rotate }) => {
  return (
    <Wrapper color={color} rotate={rotate} className={className} style={{ fontSize, ...style }}>
      <IconfontCN type={type} />
    </Wrapper>
  );
};

export const IconfontCN = createFromIconfontCN<IconfontType>({ scriptUrl: import.meta.env.VITE_ICONFONT_SCRIPT_URL });

export default memo(Iconfont);

const Wrapper = styled.span<Pick<IconfontProps, "color" | "rotate">>`
  color: ${p => p.color};
  svg {
    ${p => (isNumber(p.rotate) ? `transform: rotate(${p.rotate}deg)` : "")}
  }
`;