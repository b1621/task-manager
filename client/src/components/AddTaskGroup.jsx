import React from "react";
import Popup from "./Popup";
import { IoMdClose } from "react-icons/io";
import { format } from "date-fns";
import Input from "./Input";
import Button from "./Button";

const AddTaskGroup = ({ handleCloseAddTaskGroup }) => {
  //   const currentDate = format(format(new Date()), "yyyy-MM-dd");
  return (
    <Popup>
      <div className="px-10 py-5">
        <div className="flex justify-end">
          <button onClick={handleCloseAddTaskGroup}>
            <IoMdClose size={23} className="" />
          </button>
        </div>
        <div className="my-3 flex items-center justify-between">
          <h2 className="text-3xl">Add Task</h2>
          <p className="text-slate-500">Today 20/05/2024 </p>
        </div>
        <div className="mb-3 mt-7 space-y-3">
          <Input
            labelName={"Name the task group"}
            //   value={date}
            //   inputType={"date"}
            //   setValue={setDate}
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
            ></textarea>
          </div>
          <Input
            labelName={"Join Code"}
            //   value={date}
            //   inputType={"date"}
            //   setValue={setDate}
            // placeholder={"task name"}
          />
        </div>
        <div className="flex justify-center pt-5">
          <Button> + Add Task </Button>
        </div>
      </div>
    </Popup>
  );
};

export default AddTaskGroup;
