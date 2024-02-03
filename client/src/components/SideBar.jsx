import React from "react";
import { RxDashboard } from "react-icons/rx";
import { IoChatbubblesOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { GoTasklist } from "react-icons/go";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathParts = currentPath.split("/");
  console.log(pathParts);

  console.log(location);
  console.log(currentPath);
  const sideButtonStyle =
    "flex items-center space-x-2  px-6 py-2 rounded-md cursor-pointer hover:bg-sky-100 hover:text-sky-700";

  const activeLink = "bg-sky-100 text-sky-700";
  return (
    <div className="min-h-screen bg-white md:w-[18%] 2xl:w-[12%]">
      <div className="mx-auto w-fit flex-col space-y-3 py-14">
        <Link
          to={`/${pathParts[1]}/${pathParts[2]}`}
          className={`${sideButtonStyle} ${
            currentPath === `/${pathParts[1]}/${pathParts[2]}` ? activeLink : ""
          }`}
        >
          <RxDashboard />
          <p>Dashboard</p>
        </Link>
        <Link
          to={`/${pathParts[1]}/${pathParts[2]}/team`}
          className={`${sideButtonStyle} ${
            currentPath === `/${pathParts[1]}/${pathParts[2]}/team`
              ? activeLink
              : ""
          }`}
        >
          <AiOutlineTeam />
          <p>Team</p>
        </Link>
        <Link
          to={`/${pathParts[1]}/${pathParts[2]}/chat`}
          className={`${sideButtonStyle} ${
            currentPath === `/${pathParts[1]}/${pathParts[2]}/chat`
              ? activeLink
              : ""
          }`}
        >
          <IoChatbubblesOutline />
          <p>Chat</p>
        </Link>
        <Link
          to={`/${pathParts[1]}/${pathParts[2]}/task`}
          className={`${sideButtonStyle} ${
            currentPath === `/${pathParts[1]}/${pathParts[2]}/task`
              ? activeLink
              : ""
          }`}
        >
          <GoTasklist />
          <p>Task</p>
        </Link>
        <Link
          to={`/${pathParts[1]}/${pathParts[2]}/report`}
          className={`${sideButtonStyle} ${
            currentPath === `/${pathParts[1]}/${pathParts[2]}/report`
              ? activeLink
              : ""
          }`}
        >
          <TbReportAnalytics />
          <p>Report</p>
        </Link>
        <Link
          to={`/${pathParts[1]}/${pathParts[2]}/setting`}
          className={`${sideButtonStyle} ${
            currentPath === `/${pathParts[1]}/${pathParts[2]}/setting`
              ? activeLink
              : ""
          }`}
        >
          <IoSettingsOutline />
          <p>Setting</p>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
