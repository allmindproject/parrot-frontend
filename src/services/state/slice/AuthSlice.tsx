import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: { loggedIn: false },
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});

export const AuthActions = AuthSlice.actions;
