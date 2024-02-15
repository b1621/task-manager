import React from "react";

const Button = ({ children, handleClick }) => {
  return (
    <button
      className="rounded-md border bg-primaryColor px-5 py-2 text-sm text-white hover:bg-blue-600"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
