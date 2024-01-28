import React from "react";

const NavBar = () => {
  return (
    <div className="border-b">
      <div className="container mx-auto flex justify-between py-3">
        <div>
          <span className="text-sky-600">Task </span> Manager
        </div>
        <div>
          <p>profile</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
