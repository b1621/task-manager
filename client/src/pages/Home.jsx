import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const cancelSearch = (e) => {
    setSearchValue("");
  };
  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-100">
        <div className="">
          <div className="flex justify-between">
            <div>
              <h2>Task Group</h2>
            </div>
            <div>
              <SearchBar
                handleChange={handleChange}
                searchValue={searchValue}
                cancelSearch={cancelSearch}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
