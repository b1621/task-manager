import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      groupId: 12,
      task: "backend",
      duedate: "jan 28, 2023",
      assignee: "kal",
      status: "done",
      priority: "urgent",
    },
    {
      id: 2,
      groupId: 111,
      task: "api",
      duedate: "feb 08, 2023",
      assignee: "kal",
      status: "inprogress",
      priority: "high",
    },
    {
      id: 3,
      groupId: 13,
      task: "database",
      duedate: "jan 28, 2023",
      assignee: "kal",
      status: "todo",
      priority: "medium",
    },
    {
      id: 5,
      groupId: 111,
      task: "database",
      duedate: "jan 28, 2023",
      assignee: "kal",
      status: "todo",
      priority: "low",
    },
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
