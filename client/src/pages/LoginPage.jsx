import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginPage = () => {
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
          <form>
            <h2 className="text-center text-4xl font-bold">Account Login</h2>
            <p className="mt-4 text-slate-600">
              If you are already member you can login with your email address
              and password
            </p>
            <div className="mt-8 space-y-3">
              <Input
                labelName={"Email Address"}
                //   value={date}
                inputType={"email"}
                //   setValue={setDate}
                // placeholder={"task name"}
              />
              <Input
                labelName={"Password"}
                //   value={date}
                inputType={"password"}
                //   setValue={setDate}
                // placeholder={"task name"}
              />
            </div>
            <button className="mb-4 mt-10 w-full rounded-md border bg-primaryColor py-3 text-white hover:bg-blue-600">
              {" "}
              Login
            </button>
            <div className="text-center">
              Don't have an account ?{" "}
              <span className="text-primaryColor hover:text-blue-600">
                {" "}
                Sign up here
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
