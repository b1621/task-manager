import { configureStore } from "@reduxjs/toolkit";
import taskGroupSlice from "./features/taskGroupSlice";

export const store = configureStore({
  reducer: {
    taskGroup: taskGroupSlice,
  },
});
