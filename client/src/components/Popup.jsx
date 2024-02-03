import React from "react";

const Popup = ({ children }) => {
  return (
    <div className="absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-40">
      <div className="mx-auto my-20 w-[35%] bg-white p-5">{children}</div>
    </div>
  );
};

export default Popup;
