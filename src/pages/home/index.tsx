import React from "react";
import { Outlet } from "react-router-dom";

const Home: React.FC = props => {
  return (
    <div>
      home
      <Outlet />
    </div>
  );
};

export default Home;
