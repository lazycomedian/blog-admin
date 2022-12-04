import { RoleController } from "@/service/api/role";
import { useRequest } from "ahooks";
import React from "react";
import { Outlet } from "react-router-dom";

const Home: React.FC = props => {
  useRequest(RoleController.list);

  return (
    <div>
      home
      <Outlet />
    </div>
  );
};

export default Home;
