import React from "react";

const Select = ({ options, selectedValue, setSelectedValue, labelName }) => {
  return (
    <div className="w-full">
      <label className="mb-1 block text-slate-900" htmlFor="select">
        {labelName}
      </label>
      <select
        id="select"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className="w-full rounded-md border border-slate-400 bg-transparent px-4 py-3 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-green-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
