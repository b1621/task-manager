import React, { useState } from "react";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../features/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("fill in both email and password");
        return;
      }

      // Check if the provided email and password match any user's credentials
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        console.log("login successfull");
        toast.success("Login Successfully !!");
        // Redirect to a different page after successful login
        dispatch(login(user));
        navigate("/taskGroup");
      } else {
        console.log("invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="bg-primaryColor">
        <h2 className="m-10 text-xl text-white">
          {" "}
          <span className="font-semibold">Task</span>Manager
        </h2>
        <img className="m-auto w-[70%]" src="/Reset password-pana.png" alt="" />
      </div>
      <div>
        <div className="mx-auto my-40 w-[50%]">
          <form onSubmit={handleLogin}>
            <h2 className="text-center text-4xl font-bold">Account Login</h2>
            <p className="mt-4 text-xl text-slate-500">
              If you are already member you can login with your email address
              and password
            </p>
            <div className="mt-8 space-y-3">
              <Input
                labelName={"Email Address"}
                id={"email"}
                value={email}
                inputType={"email"}
                setValue={setEmail}
                // placeholder={"task name"}
              />
              <Input
                labelName={"Password"}
                id={"password"}
                value={password}
                inputType={"password"}
                setValue={setPassword}
                // placeholder={"task name"}
              />
            </div>
            <button className="mb-4 mt-10 w-full rounded-md border bg-primaryColor py-3 text-white hover:bg-blue-600">
              {" "}
              Login
            </button>
            <Link to={"/register"} className="text-center">
              have an account ?{" "}
              <span className="text-primaryColor hover:text-blue-600">
                {" "}
                Sign up here
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
