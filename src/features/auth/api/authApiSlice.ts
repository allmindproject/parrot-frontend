import { apiSlice } from "@/services/api/apiSlice";
import { AuthResult } from "@/types";
import { LoginValues } from "../types";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResult, LoginValues>({
      query: ({ email, password }) => ({
        url: "/sign-in",
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
