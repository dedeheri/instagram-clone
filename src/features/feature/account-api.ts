import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountApi = createApi({
  reducerPath: "ACCOUNT",

  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "api/accounts/signup",
        method: "POST",
        body: body,
      }),
    }),

    login: builder.mutation({
      query: (body) => ({
        url: "api/accounts/signin",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = accountApi;
