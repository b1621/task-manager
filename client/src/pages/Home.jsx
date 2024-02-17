import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import TableLayout from "../components/Table/TableLayout";
import TableRow from "../components/Table/TableRow";
import TableData from "../components/Table/TableData";
import { Link } from "react-router-dom";
import AddTaskGroup from "../components/AddTaskGroup";
import JoinTask from "../components/JoinTask";
import { useSelector } from "react-redux";

const Home = () => {
  const [viewAddTaskGroup, setViewAddTaskGroup] = useState(false);
  const [viewJoinGroup, setViewJoinGroup] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { taskGroups } = useSelector((state) => state.taskGroup);
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const cancelSearch = (e) => {
    setSearchValue("");
  };
  const handleAddTaskGroup = () => {
    setViewAddTaskGroup(true);
  };
  const handleCloseAddTaskGroup = () => {
    setViewAddTaskGroup(false);
  };
  const handleJoinGroup = () => {
    setViewJoinGroup(true);
  };
  const handleCloseJoinGroup = () => {
    setViewJoinGroup(false);
  };
  return (
    <div>
      <NavBar />
      {viewAddTaskGroup && (
        <AddTaskGroup handleCloseAddTaskGroup={handleCloseAddTaskGroup} />
      )}{" "}
      {viewJoinGroup && (
        <JoinTask handleCloseJoinGroup={handleCloseJoinGroup} />
      )}{" "}
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
              <Button handleClick={handleAddTaskGroup}>+ Create</Button>
              <Button handleClick={handleJoinGroup}>+ Join </Button>
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
                  <TableData>{group.description}</TableData>
                  <TableData>{group.status}</TableData>
                  <TableData>{group.startDate}</TableData>
                  <TableData>
                    <Link to={`/group/${group.id}`}>
                      <Button>Open</Button>
                    </Link>
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
