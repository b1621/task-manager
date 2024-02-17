import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskGroups: [
    {
      id: "12",
      taskGroup: "backend",
      description: "some descritpion",
      status: "active",
      startDate: "February 5, 2023",
      tasks: [
        {
          id: 1,

          task: "backend",
          duedate: "jan 28, 2023",
          assignee: "kal",
          status: "done",
          priority: "urgent",
        },
        {
          id: 2,

          task: "api",
          duedate: "feb 08, 2023",
          assignee: "kal",
          status: "inprogress",
          priority: "urgent",
        },
      ],
    },
    {
      id: "111",
      taskGroup: "Frontend",
      description: "some descritpion",
      status: "active",
      startDate: "February 5, 2023",
      tasks: [
        {
          id: 3,
          groupId: 13,
          task: "database",
          duedate: "jan 28, 2023",
          assignee: "kal",
          status: "todo",
          priority: "urgent",
        },
      ],
    },
    {
      id: "13",
      taskGroup: "management",
      description: "some descritpion",
      status: "active",
      startDate: "February 5, 2023",
      tasks: [
        {
          id: 3,
          groupId: 13,
          task: "database",
          duedate: "jan 28, 2023",
          assignee: "kal",
          status: "todo",
          priority: "urgent",
        },
        {
          id: 5,
          groupId: 111,
          task: "database",
          duedate: "jan 28, 2023",
          assignee: "kal",
          status: "todo",
          priority: "urgent",
        },
      ],
    },
  ],
};

const taskGroupSlice = createSlice({
  name: "taskGroup",
  initialState,
  reducers: {
    addTaskGroup: (state, action) => {
      state.taskGroups.push(action.payload);
    },
  },
});

export const { addTaskGroup } = taskGroupSlice.actions;
export default taskGroupSlice.reducer;
