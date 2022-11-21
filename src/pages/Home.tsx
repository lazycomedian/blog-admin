import SvgIcon from "@/components/SvgIcon";
import { TestService } from "@/service/api/test";
import { useStore } from "@/store";
import { Button } from "antd";
import { observer } from "mobx-react";
import React from "react";

const Home: React.FC = () => {
  const { userStore, themeStore } = useStore();

  return (
    <div className="flex-center">
      Home
      {userStore.testNum}
      <SvgIcon name="xianxingdaoyu" height={300} />
      <Button type="primary" onClick={() => TestService.test()}>
        测试
      </Button>
      <Button
        onClick={() => {
          userStore.setTestNum();
        }}
      >
        ++
      </Button>
      <Button
        onClick={() => {
          themeStore.switchDarkMode();
        }}
      >
        主题
      </Button>
    </div>
  );
};

export default observer(Home);
