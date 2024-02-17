import { configureStore } from "@reduxjs/toolkit";
import taskGroupSlice from "./features/taskGroupSlice";
import userSlice from "./features/userSlice";
import taskSlice from "./features/taskSlice";
import memberSlice from "./features/memberSlice";

export const store = configureStore({
  reducer: {
    taskGroup: taskGroupSlice,
    task: taskSlice,
    user: userSlice,
    member: memberSlice,
  },
});
