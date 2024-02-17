import React, { useState } from "react";
import Button from "../components/Button";
import TableLayout from "../components/Table/TableLayout";
import TableRow from "../components/Table/TableRow";
import TableData from "../components/Table/TableData";
import { CiMenuKebab } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { GoDiamond } from "react-icons/go";

import AddTask from "../components/AddTask";
import { useSelector } from "react-redux";
import moment from "moment";

const Tasks = () => {
  const [viewAddTask, setViewAddTask] = useState(false);
  const { tasks } = useSelector((state) => state.task);
  const handleAddTask = () => {
    setViewAddTask(true);
  };

  const handleCloseAddTask = () => {
    setViewAddTask(false);
  };
  return (
    <div>
      {viewAddTask && <AddTask handleCloseAddTask={handleCloseAddTask} />}{" "}
      <div className="min-h-screen border bg-gray-100">
        <div className="container mx-auto my-5 bg-white p-6">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2>Tasks</h2>
            </div>
            <div className="flex space-x-4">
              <Button handleClick={handleAddTask}>+ Add Task</Button>
            </div>
          </div>
          <div className="my-6">
            <TableLayout
              headerList={[
                "Task ",
                "Due Date",
                "Assignee",
                "Status",
                "Prioriy",
                "",
              ]}
            >
              {tasks.map((task, index) => (
                <TableRow>
                  <TableData>{task.task}</TableData>
                  <TableData>
                    {moment(task.duedate).format("MMMM Do YYYY")}
                  </TableData>
                  <TableData>{task.assignee}</TableData>
                  <TableData>
                    {" "}
                    <span
                      className={` flex items-center space-x-1 font-normal ${getStatusColor(
                        task.status
                      )}`}
                    >
                      <FaCircle size={7} />
                      <span>{task.status}</span>
                    </span>
                  </TableData>
                  <TableData>
                    {" "}
                    <span
                      className={`flex items-center space-x-1 font-normal ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {/* <FaDiamond size={7} /> */}
                      <GoDiamond size={10} />

                      <span>{task.priority}</span>
                    </span>
                  </TableData>
                  <TableData>
                    <CiMenuKebab size={14} />
                  </TableData>
                </TableRow>
              ))}
            </TableLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "inprogress":
      return "text-amber-600"; // Adjust the color as needed
    case "todo":
      return "text-sky-600"; // Adjust the color as needed
    case "done":
      return "text-emerald-600"; // Adjust the color as needed
    default:
      return "";
  }
};
const getPriorityColor = (priority) => {
  switch (priority) {
    case "urgent":
      return "text-pink-600"; // Adjust the color as needed
    case "high":
      return "text-red-500"; // Adjust the color as needed
    case "medium":
      return "text-amber-600"; // Adjust the color as needed
    case "low":
      return "text-emerald-600"; // Adjust the color as needed
    default:
      return "";
  }
};

export default Tasks;
