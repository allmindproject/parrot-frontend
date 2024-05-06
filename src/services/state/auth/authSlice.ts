import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DecodedToken, Role } from "@/types";
import { jwtDecode } from "jwt-decode";
import { convertStringToRole } from "@/utils/convertStringToRole";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
};

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: { payload: string }) => {
      const token = action.payload;
      const decodedToken: DecodedToken = jwtDecode(token);
      const user: User = {
        email: decodedToken.sub,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        role: convertStringToRole(decodedToken.scope),
      };

      state.token = token;
      state.user = user;

      console.log("setCredentials reducer");
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

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState): User | null =>
  state.auth.user;
export const selectCurrentToken = (state: RootState): string | null =>
  state.auth.token;
export const selectIsAuthenticated = (state: RootState): boolean =>
  !!state.auth.token && !!state.auth.user;

export default authSlice.reducer;
