import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskGroups: [
    {
      id: "12",
      taskGroup: "backend",
      description: "some descritpion",
      status: "active",
      startDate: "February 5, 2023",
    },
    {
      id: "111",
      taskGroup: "Frontend",
      description: "some descritpion",
      status: "active",
      startDate: "February 5, 2023",
    },
    {
      id: "13",
      taskGroup: "management",
      description: "some descritpion",
      status: "active",
      startDate: "February 5, 2023",
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
