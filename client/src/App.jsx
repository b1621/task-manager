import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <h2 className="text-center text-2xl">Hello world</h2>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={"hello world ..."} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
