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

  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUsers: (state, action) => {
      state.users.push(action.payload);
    },
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { registerUsers, login } = userSlice.actions;
export default userSlice.reducer;
