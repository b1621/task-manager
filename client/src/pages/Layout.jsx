import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="w-full bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
