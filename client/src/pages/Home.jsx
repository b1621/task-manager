import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import TableLayout from "../components/Table/TableLayout";
import TableRow from "../components/Table/TableRow";
import TableData from "../components/Table/TableData";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const cancelSearch = (e) => {
    setSearchValue("");
  };
  const taskGroups = [
    {
      taskGroup: "backend",
      descritpion: "some descritpion",
      status: "active",
      startDate: "February 5, 2023",
    },
    {
      taskGroup: "backend",
      descritpion: "some descritpion",
      status: "active",
      startDate: "February 5, 2023",
    },
    {
      taskGroup: "backend",
      descritpion: "some descritpion",
      status: "active",
      startDate: "February 5, 2023",
    },
  ];
  return (
    <div>
      <NavBar />
      <div className="min-h-screen border bg-gray-100">
        <div className="container mx-auto my-5 bg-white p-6">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2>Task Group</h2>
            </div>
            <div className="flex space-x-4">
              <SearchBar
                handleChange={handleChange}
                searchValue={searchValue}
                cancelSearch={cancelSearch}
              />
              <Button>+ Create</Button>
              <Button>+ Join </Button>
            </div>
          </div>
          <div className="my-6">
            <TableLayout
              headerList={[
                "#",
                "Task Group",
                "Description",
                "Status",
                "Start Date",
                "Action",
              ]}
            >
              {taskGroups.map((group, index) => (
                // <div key={index}>
                <TableRow>
                  <TableData>{index + 1}</TableData>
                  <TableData>
                    {" "}
                    <span className="font-semibold"> {group.taskGroup}</span>
                  </TableData>
                  <TableData>{group.descritpion}</TableData>
                  <TableData>{group.status}</TableData>
                  <TableData>{group.startDate}</TableData>
                  <TableData>
                    <Button>Open</Button>
                  </TableData>
                </TableRow>
                // </div>
              ))}
            </TableLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
