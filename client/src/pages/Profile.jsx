import React from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <NavBar />
      <div className="min-h-screen border bg-gray-100">
        <div className="container mx-auto my-5 bg-white p-6">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2>Profile</h2>
            </div>
            <form></form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
