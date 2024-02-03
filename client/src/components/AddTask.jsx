import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { IoMdClose } from "react-icons/io";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { IoAdd } from "react-icons/io5";
import { format } from "date-fns";

const AddTask = ({ handleCloseAddTask }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const formattedTime = format(currentTime, "HH:mm:ss");

  const [task, setTask] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState(formattedTime);
  const [priority, setPriority] = useState("");
  const [assigne, setAssigne] = useState("");

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
          <p className="text-slate-500">Today {formattedTime} </p>
        </div>
        <div className="my-7 space-y-7">
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
            <Input
              labelName={" Time"}
              inputType={"time"}
              value={time}
              setValue={setTime}
              // placeholder={"task name"}
            />
          </div>
          <div className="flex space-x-7">
            <Select
              options={[
                { value: "todo", label: "To-Do" },
                { value: "inprogress", label: "In-Progress" },
                { value: "done", label: "Done" },
              ]}
              selectedValue={priority}
              setSelectedValue={setPriority}
              labelName="Task Priority"
            />
            <Select
              options={[
                { value: "kal", label: "Kal" },
                { value: "tom", label: "Tom" },
              ]}
              selectedValue={assigne}
              setSelectedValue={setAssigne}
              labelName="Task Assigne"
            />
          </div>
          <div className="flex justify-center pt-5">
            <Button> + Add Task </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default AddTask;
