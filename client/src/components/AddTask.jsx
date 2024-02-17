import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { IoMdClose } from "react-icons/io";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { IoAdd } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

import moment from "moment";
import { useDispatch } from "react-redux";
import { addTask } from "../features/taskSlice";
import { toast } from "react-toastify";

const AddTask = ({ handleCloseAddTask }) => {
  // const formattedTime = moment().format("h:mm:ss");

  const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");

  const [task, setTask] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  // const [time, setTime] = useState(formattedTime);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [assignee, setAssignee] = useState("");

  const disptach = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task || !priority || !status || !assignee) {
      toast.error("fill all forms");
      return;
    }

    const id = uuidv4();

    disptach(
      addTask({
        id,
        task,
        duedate: date,
        priority,
        status,
        assignee,
      })
    );
    toast.success("task  created successfully ");
    handleCloseAddTask();
  };

  return (
    <Popup>
      <div className="px-10 py-5">
        <div className="flex justify-end">
          <button onClick={handleCloseAddTask}>
            <IoMdClose size={23} />
          </button>
        </div>
        <div className="my-3 flex items-center justify-between">
          <h2 className="text-3xl">Add Task</h2>
          <p className="text-slate-500"> {currentDate} </p>
        </div>
        <form onSubmit={handleSubmit} className="my-7 space-y-7">
          <Input
            labelName={"Name the Task"}
            value={task}
            setValue={setTask}
            // placeholder={"task name"}
          />
          <div className="flex justify-between space-x-7">
            <Input
              labelName={"Due Date"}
              value={date}
              inputType={"date"}
              setValue={setDate}
              // placeholder={"task name"}
            />
            {/* <Input
              labelName={" Time"}
              inputType={"time"}
              value={time}
              setValue={setTime}
              // placeholder={"task name"}
            /> */}
            <Select
              options={[
                { value: "kal", label: "Kal" },
                { value: "tom", label: "Tom" },
              ]}
              selectedValue={assignee}
              setSelectedValue={setAssignee}
              labelName="Task Assignee"
            />
          </div>
          <div className="flex space-x-7">
            <Select
              options={[
                { value: "urgent", label: "Urgent" },
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ]}
              selectedValue={priority}
              setSelectedValue={setPriority}
              labelName="Task Priority"
            />
            <Select
              options={[
                { value: "todo", label: "To-Do" },
                { value: "inprogress", label: "In-Progress" },
                { value: "done", label: "Done" },
              ]}
              selectedValue={status}
              setSelectedValue={setStatus}
              labelName="Task Status"
            />
          </div>
          <div className="flex justify-center pt-5">
            <Button> + Add Task </Button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default AddTask;
