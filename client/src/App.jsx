import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskGroup from "./pages/TaskGroup";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      {/* <div className="font-fontBarlowb"> */}
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/group/:groupId" element={<Layout />}>
              <Route path="" element={<TaskGroup />} />
              <Route path="team" element={"team"} />
              <Route path="chat" element={"chat"} />
              <Route path="task" element={"task"} />
              <Route path="report" element={"report"} />
              <Route path="setting" element={"setting"} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
