import { useStore } from "@/store";
import { Switch } from "antd";
import { observer } from "mobx-react";
import React, { memo } from "react";

interface SwitchDarkProps {
  className?: string;
}

const SwitchDark: React.FC<SwitchDarkProps> = ({ className }) => {
  const { themeStore } = useStore();

  return (
    <Switch
      className={className}
      checked={themeStore.isDarkMode}
      checkedChildren={<React.Fragment>🌞</React.Fragment>}
      unCheckedChildren={<React.Fragment>🌜</React.Fragment>}
      onChange={() => themeStore.switchDarkMode()}
    />
  );
};

export default memo(observer(SwitchDark));
