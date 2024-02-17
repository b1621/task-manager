import React from "react";
import { FcGoogle } from "react-icons/fc";

const Setting = () => {
  return (
    <div className="m-10 bg-white p-10">
      <div className="flex items-center">
        <p className="mr-4">Verify Your Google Calander Api : </p>
        <button className="flex items-center rounded-md border bg-slate-100 px-4 py-1 shadow-md">
          <FcGoogle className="mr-2" /> Continue with Google
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Setting;
