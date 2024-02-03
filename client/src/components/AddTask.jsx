import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { IoMdClose } from "react-icons/io";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

const AddTask = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [task, setTask] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const formattedTime = currentTime.toLocaleTimeString();
  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <Popup>
      <div className="px-10 py-5">
        <div className="flex justify-end">
          <button>
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
              value={task}
              inputType={"date"}
              setValue={setTask}
              // placeholder={"task name"}
            />
            <Input
              labelName={" Time"}
              inputType={"time"}
              value={task}
              setValue={setTask}
              // placeholder={"task name"}
            />
          </div>
          <div className="flex space-x-7">
            <Select
              options={options}
              selectedValue={selectedOption}
              setSelectedValue={setSelectedOption}
              labelName="Select Option"
            />
            <Select
              options={options}
              selectedValue={selectedOption}
              setSelectedValue={setSelectedOption}
              labelName="Select Option"
            />
          </div>
          <div className="flex justify-center">
            <Button> Add Task </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default AddTask;
