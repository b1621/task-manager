import React from "react";
import Button from "../components/Button";
import TableLayout from "../components/Table/TableLayout";
import TableRow from "../components/Table/TableRow";
import TableData from "../components/Table/TableData";
import { CiMenuKebab } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      task: "backend",
      duedate: "jan 28, 2023",
      assignee: "kal",
      status: "done",
      priority: "urgent",
    },
    {
      id: 2,
      task: "api",
      duedate: "feb 08, 2023",
      assignee: "kal",
      status: "inprogress",
      priority: "urgent",
    },
    {
      id: 3,
      task: "database",
      duedate: "jan 28, 2023",
      assignee: "kal",
      status: "todo",
      priority: "urgent",
    },
  ];
  return (
    <div>
      {" "}
      <div className="min-h-screen border bg-gray-100">
        <div className="container mx-auto my-5 bg-white p-6">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2>Task Group</h2>
            </div>
            <div className="flex space-x-4">
              <Button>+ Add Task</Button>
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
                  <TableData>{task.duedate}</TableData>
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
                  <TableData>{task.priority}</TableData>
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

export default Tasks;
