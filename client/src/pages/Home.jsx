import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import TableLayout from "../components/Table/TableLayout";

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
      <div className="min-h-screen border bg-gray-100">
        <div className="container mx-auto my-5 bg-white p-4">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2>Task Group</h2>
            </div>
            <div className="flex space-x-4">
              <SearchBar
                handleChange={handleChange}
                searchValue={searchValue}
                cancelSearch={cancelSearch}
              />{" "}
              <Button>+ Create</Button>
              <Button>+ Join </Button>
            </div>
          </div>
          <div>
            <TableLayout
              headerList={[
                "Task Group",
                "Description",
                "Status",
                "Start Date",
                "Action",
              ]}
            ></TableLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
