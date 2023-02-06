import { useAppTitle } from "@/hooks";
import PageCard from "@/layouts/PageCard";
import PageHeader from "@/layouts/PageHeader";
import React from "react";

const UserCenter: React.FC = () => {
  useAppTitle();

  return (
    <React.Fragment>
      <PageHeader />
      <PageCard></PageCard>
    </React.Fragment>
  );
};

export default UserCenter;
