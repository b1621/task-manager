import React from "react";
import { RxDashboard } from "react-icons/rx";
import { IoChatbubblesOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { GoTasklist } from "react-icons/go";

const SideBar = () => {
  const sideButtonStyle =
    "flex items-center space-x-2  px-6 py-2 rounded-md cursor-pointer hover:bg-sky-100 hover:text-sky-700";
  return (
    <div className="min-h-screen bg-white md:w-[18%]">
      <div className="mx-auto w-fit flex-col space-y-3 py-14">
        <div className={sideButtonStyle}>
          <RxDashboard />
          <p>Dashboard</p>
        </div>
        <div className={sideButtonStyle}>
          <AiOutlineTeam />
          <p>Team</p>
        </div>
        <div className={sideButtonStyle}>
          <IoChatbubblesOutline />
          <p>Chat</p>
        </div>
        <div className={sideButtonStyle}>
          <GoTasklist />
          <p>Task</p>
        </div>
        <div className={sideButtonStyle}>
          <TbReportAnalytics />
          <p>Report</p>
        </div>
        <div className={sideButtonStyle}>
          <IoSettingsOutline />
          <p>Setting</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
