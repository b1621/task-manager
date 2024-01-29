import React from "react";

const Button = ({ children, handleClick }) => {
  return (
    <button
      className="rounded-md border bg-sky-500 px-5 py-1 text-sm text-white hover:bg-sky-600"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
