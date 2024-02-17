import React from "react";
import TableLayout from "../components/Table/TableLayout";
import TableRow from "../components/Table/TableRow";
import TableData from "../components/Table/TableData";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import moment from "moment";

const Team = () => {
  const { members } = useSelector((state) => state.member);
  return (
    <div>
      {/* {viewAddTask && <AddTask handleCloseAddTask={handleCloseAddTask} />} */}
      <div className="min-h-screen border bg-gray-100">
        <div className="container mx-auto my-5 bg-white p-6">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-2xl">Members</h2>
            </div>
            <div className="flex space-x-4">{/* <Button>+ </Button> */}</div>
          </div>
          <div className="my-6">
            <TableLayout headerList={["#", "Name", "Task", "DueDate"]}>
              {members.map((member, index) => (
                <TableRow>
                  <TableData>{index + 1}</TableData>
                  <TableData>{member.name}</TableData>
                  <TableData>{member.task}</TableData>
                  <TableData>
                    {moment(member.duedate).format("MMMM Do YYYY")}
                  </TableData>
                </TableRow>
              ))}
            </TableLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
