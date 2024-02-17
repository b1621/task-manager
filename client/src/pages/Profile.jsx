import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";
import { logout, updateProfile } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    try {
      if (!email || !password || !name || !confPassword) {
        toast.error("fill all inputs");
        return;
      }
      if (password.length < 5) {
        toast.error("Password should be at least 5 characters long");
        return;
      }
      if (password !== confPassword) {
        toast.error("password doen't match");
        return;
      }

      dispatch(updateProfile({ id: user.id, name, email, password }));
      toast.success("Profile updated  !!");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <>
      <NavBar />
      <div className="min-h-screen border bg-gray-100">
        <div className="container mx-auto my-5 bg-white p-6">
          <div className="mx-10 flex items-center justify-between pb-4">
            <h2 className="text-3xl">Profile</h2>
            <button
              className="rounded-md border px-6 py-1 transition-all duration-300 hover:bg-slate-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <form className="mx-auto mb-20 w-[50%]" onSubmit={handleUpdate}>
            <h2 className="mb-10 text-2xl">Edit Profile</h2>
            <div className="space-y-4">
              <Input labelName={"Full Name"} value={name} setValue={setName} />
              <Input
                labelName={"Email"}
                inputType={"email"}
                setValue={setEmail}
                value={email}
              />
              <Input
                labelName={"Password"}
                value={password}
                inputType={"password"}
                setValue={setPassword}
              />
              <Input
                labelName={"Confirm Password"}
                value={confPassword}
                inputType={"password"}
                setValue={setConfPassword}
              />

              <Button>Edit Profile</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
