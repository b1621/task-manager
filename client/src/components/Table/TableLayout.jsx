import React from "react";
import { IoIosArrowRoundDown } from "react-icons/io";

const TableLayout = ({ children, headerList }) => {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full bg-white text-left text-sm font-light">
        <thead className="border-b border-b-slate-300">
          <tr className="">
            {headerList.map((element, index) => (
              <th key={index} className="px-6 py-4">
                <span className="flex items-center space-x-1 font-semibold text-slate-700">
                  {element}
                  <IoIosArrowRoundDown size={20} />
                </span>
              </th>
            ))}
            "
          </tr>
        </thead>{" "}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableLayout;
