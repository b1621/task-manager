import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="border-b">
      <div className="container mx-auto flex justify-between py-3">
        <div>
          <Link to="/">
            <span className="font-semibold text-sky-600">Task</span>Manager
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          <p>
            <IoNotificationsOutline size={22} />
          </p>
          {/* <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              profile
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </p> */}

          <p className="rounded-full border bg-slate-200 px-4 py-2">K</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
