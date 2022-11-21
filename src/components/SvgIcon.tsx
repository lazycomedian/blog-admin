import React, { memo } from "react";

interface SvgIconProps {
  /** svg名称 */
  name: string;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  style?: React.CSSProperties;
  prefix?: string;
}

const SvgIcon: React.FC<SvgIconProps> = props => {
  const { name, prefix = "icon", height = 100, width = height, style } = props;
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg aria-hidden="true" style={{ width, height, ...style }}>
      <use href={symbolId} />
    </svg>
  );
};

export default memo(SvgIcon);
