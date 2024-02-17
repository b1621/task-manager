import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import TaskGroup from "./pages/TaskGroup";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <>
      {/* <div className="font-fontBarlowb"> */}
      <div className="">
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />

            {/* <Route element={<ProtectRoute />}> */}
            <Route
              path="/taskGroup"
              element={
                <ProtectRoute>
                  <Home />{" "}
                </ProtectRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectRoute>
                  <Profile />{" "}
                </ProtectRoute>
              }
            />
            <Route
              path="/group/:groupId"
              element={
                <ProtectRoute>
                  <Layout />{" "}
                </ProtectRoute>
              }
            >
              <Route path="" element={<TaskGroup />} />
              <Route path="team" element={"team"} />
              <Route path="chat" element={"chat"} />
              <Route path="task" element={<Tasks />} />
              <Route path="report" element={"report"} />
              <Route path="setting" element={"setting"} />
            </Route>
            {/* </Route> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
