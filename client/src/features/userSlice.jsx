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
  isAuthenticated: false,
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
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      const { id, name, email, password } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          name,
          email,
          password,
        };
      }
      if (state.user.id === id) {
        state.user = { ...state.user, name, email, password };
      }
    },
  },
});

export const { registerUsers, login, logout, updateProfile } =
  userSlice.actions;
export default userSlice.reducer;
