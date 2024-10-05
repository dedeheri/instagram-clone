import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../base-url";

export const userPhotoApi = createApi({
  reducerPath: "USER_PHOTO",

  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders(headers) {
      headers.set(
        "Authorization",
        `Client-ID OR7v6f0PrFy63FLeKZU_AXlx-vNAt2MWWTeBRVamIF8`
      );
    },
  }),

  endpoints: (builder) => ({
    getUserDetail: builder.query<any, string>({
      query: (username) => `/users/${username}`,
    }),

    getUserPhoto: builder.query<any, string>({
      query: (username) => `/users/${username}/photos`,
    }),

    getUserPhotoCollection: builder.query<any, string>({
      query: (username) => `/users/${username}/collections`,
    }),
  }),
});

export const {
  useGetUserDetailQuery,
  useGetUserPhotoQuery,
  useGetUserPhotoCollectionQuery,
} = userPhotoApi;
