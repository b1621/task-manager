import React from "react";

const Input = ({ inputType, value, placeholder, setValue, labelName }) => {
  return (
    <div className="w-full">
      <label className="mb-1 block text-slate-900" htmlFor={value}>
        {labelName}
      </label>
      <input
        type={`${inputType ? inputType : "text"}`}
        id={value}
        placeholder={`${placeholder ? placeholder : ""}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-md border border-slate-400 px-4 py-3 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-green-500"
      />
    </div>
  );
};

export default Input;
