import React, { useState } from "react";
import Popup from "./Popup";
import { IoMdClose } from "react-icons/io";
import { format } from "date-fns";
import Input from "./Input";
import Button from "./Button";

import { useDispatch } from "react-redux";
import { addTaskGroup } from "../features/taskGroupSlice";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library
const AddTaskGroup = ({ handleCloseAddTaskGroup }) => {
  //   const currentDate = format(format(new Date()), "yyyy-MM-dd");
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const disptach = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const curentDate = format(new Date(), "yyyy-MM-dd");
    if (!groupName || !description || !code) {
      toast.error("fill all forms");
      return;
    }
    const id = uuidv4();

    disptach(
      addTaskGroup({
        id,
        taskGroup: groupName,
        description,
        status: "active",
        code,
        startDate: curentDate,
      })
    );

    handleCloseAddTaskGroup();
  };
  return (
    <Popup>
      <div className="px-10 py-5">
        <div className="flex justify-end">
          <button onClick={handleCloseAddTaskGroup}>
            <IoMdClose size={23} className="" />
          </button>
        </div>
        <div className="my-3 flex items-center justify-between">
          <h2 className="text-3xl">Add Task Group</h2>
          <p className="text-slate-500">Today 20/05/2024 </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-7 space-y-3">
            <Input
              labelName={"Name the task group"}
              value={groupName}
              id={"groupName"}
              setValue={setGroupName}
              // placeholder={"task name"}
            />
            <div>
              <label className="text-slate-800" for="description">
                Description
              </label>
              <textarea
                className="mt-1 w-full rounded-md border border-slate-400 p-5 outline-none"
                id="description"
                name="description"
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <Input
              labelName={"Join Code"}
              value={code}
              id={"code"}
              setValue={setCode}
              // placeholder={"task name"}
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

export default AddTaskGroup;
