import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Role } from "@/types";

type User = {
  email: string | null;
  firstName: string | null;
  surname: string | null;
  role: Role;
};

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: { email: null, firstName: null, surname: null, role: Role.User },
  token: null,
};
// TODO
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthToken: (state, action: { payload: string }) => {
      const token = action.payload;
      state.token = token;
      console.log("setAuthToken reducer");
      console.log(state.user);
      console.log(state.token);
    },
    setUser: (state, action: { payload: User }) => {
      const user = action.payload;
      state.user = user;
      console.log("setUser reducer");
      console.log(state.user);
      console.log(state.token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      console.log("logOut reducer");
      console.log(state.user);
      console.log(state.token);
    },
  },
});

export const { setAuthToken, setUser, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
