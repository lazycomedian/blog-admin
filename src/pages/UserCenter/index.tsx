import Iconfont from "@/components/Iconfont";
import { useAppTitle } from "@/hooks";
import PageCard from "@/layouts/PageCard";
import PageHeader from "@/layouts/PageHeader";
import React from "react";

const UserCenter: React.FC = props => {
  useAppTitle();

  return (
    <React.Fragment>
      <PageHeader />
      <PageCard>
        <Iconfont type="sentimental-right" fontSize={40} color="pink" rotate={140}></Iconfont>
      </PageCard>
    </React.Fragment>
  );
};

export default UserCenter;
