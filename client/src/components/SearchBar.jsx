import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const SearchBar = ({ handleChange, searchValue, cancelSearch }) => {
  return (
    <>
      <div className="relative flex h-12 w-[25vw]">
        <label htmlFor="search">
          <IoIosSearch
            htmlFor="search"
            size={22}
            className="absolute left-2 top-3 z-30 text-slate-600"
          />
        </label>
        <input
          id="search"
          type="text"
          onChange={handleChange}
          value={searchValue}
          placeholder="Search  ..."
          className="absolute h-full w-full rounded-md border border-slate-300 px-10 outline-none transition-all duration-300 placeholder:text-sm placeholder:text-slate-700 focus:border-green-500"
        />
        <IoCloseOutline
          size={22}
          onClick={cancelSearch}
          className="absolute right-2 top-3 z-30 cursor-pointer hover:scale-105 hover:text-black"
        />
      </div>
    </>
  );
};

export default SearchBar;
