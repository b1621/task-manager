import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 12,
      name: "joe doe",
      email: "test@gmail.com",
      password: "12345",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addusers: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { addusers } = userSlice.actions;
export default userSlice.reducer;
