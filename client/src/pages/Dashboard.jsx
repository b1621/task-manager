import React from "react";
import { RiRectangleFill } from "react-icons/ri";

import TaskPriorityChart from "../components/TaskPriorityChart";
const Dashboard = () => {
  return (
    <div>
      <div className="">
        <div className="m-10 w-[500px] bg-white">
          <h2 className="pl-5 pt-4 text-2xl">Tasks Priority Chart</h2>
          <TaskPriorityChart />
          <div className="m-5 grid grid-cols-2 gap-4 pb-10">
            <div className="flex items-center space-x-2 text-red-500">
              <span>
                <RiRectangleFill />{" "}
              </span>
              <p>Urgent</p>
            </div>
            <div className="flex items-center space-x-2 text-pink-600">
              <span>
                <RiRectangleFill />{" "}
              </span>
              <p>High</p>
            </div>
            <div className="flex items-center space-x-2 text-amber-400">
              <span>
                <RiRectangleFill />{" "}
              </span>
              <p>Medium</p>
            </div>
            <div className="flex items-center space-x-2 text-emerald-500">
              <span>
                <RiRectangleFill />{" "}
              </span>
              <p>Low</p>
            </div>
          </div>
        </div>
      </div>
      <div className="m-10 bg-white">{/* <TaskPriorityChart /> */}</div>
      <div className="m-10 bg-white">{/* <TaskPriorityChart /> */}</div>
    </div>
  );
};

export default Dashboard;
