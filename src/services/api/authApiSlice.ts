import { apiSlice } from "@/services/api/apiSlice";
import { LoginValues } from "@/types";

type AuthResult = {
  access_token: string;
  access_token_expiry: number;
  token_type: string;
  user_name: string; // email
};

export const authApiSlice = apiSlice.injectEndpoints({
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
