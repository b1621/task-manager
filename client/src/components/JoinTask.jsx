import React from "react";
import Popup from "./Popup";
import { IoMdClose } from "react-icons/io";
import { format } from "date-fns";
import Input from "./Input";
import Button from "./Button";

const JoinTask = ({ handleCloseJoinGroup }) => {
  return (
    <Popup>
      <div className="px-10 py-5">
        <div className="flex justify-end">
          <button onClick={handleCloseJoinGroup}>
            <IoMdClose size={23} className="" />
          </button>
        </div>
        <div className="my-3 flex items-center justify-between">
          <h2 className="text-3xl">Join Task Group</h2>
          <p className="text-slate-500">Today 20/05/2024 </p>
        </div>
        <div className="mb-3 mt-7 space-y-3">
          <Input
            labelName={"Task Group Name"}
            //   value={date}
            //   inputType={"date"}
            //   setValue={setDate}
            // placeholder={"task name"}
          />

          <Input
            labelName={"Joining Code"}
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

export default JoinTask;
