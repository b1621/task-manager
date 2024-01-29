import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <div>sidebar</div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
