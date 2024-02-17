import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [
    {
      id: 12,
      name: "joe doe",
      task: "front end",
      duedate: "2023-10-05",
    },
    {
      id: 15,
      name: "tom ab",
      task: "api integration",
      duedate: "2024-12-09",
    },
    {
      id: 16,
      name: "tom ab",
      task: "UI design",
      duedate: "2024-12-12",
    },
  ],
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    //   addTask: (state, action) => {
    //     state.tasks.push(action.payload);
    //   },
  },
});

//   export const { addTask } = memberSlice.actions;
export default memberSlice.reducer;
