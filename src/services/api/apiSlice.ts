import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../state/store";
import { logOut, setAuthToken } from "../state/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if (result?.error?.originalStatus === 403) {
  //   //TODO what error is thrown after token expiring
  //   console.log("sending refresh token");

  //   const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
  //   console.log(refreshResult);
  //   if (refreshResult?.data) {
  //     // const user = api.getState().auth.user;
  //     // store the new token
  //     api.dispatch(setAuthToken({ ...refreshResult.data, user }));
  //     // retry the original query with new token
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logOut());
  //   }
  // }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
