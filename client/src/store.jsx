import { configureStore } from "@reduxjs/toolkit";
import taskGroupSlice from "./features/taskGroupSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    taskGroup: taskGroupSlice,
    user: userSlice,
  },
});
