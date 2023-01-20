import { Switch } from "antd";
import React, { memo } from "react";

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className }) => {
  return (
    <Switch
      className={className}
      checkedChildren={<React.Fragment>🌞</React.Fragment>}
      unCheckedChildren={<React.Fragment>🌜</React.Fragment>}
    />
  );
};

export default memo(ThemeSwitch);
