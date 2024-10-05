import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../base-url";
import { IImage } from "@/types/image-types";

export const randomPhotosApi = createApi({
  reducerPath: "RANDOM_PHOTO",

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      headers.set(
        "Authorization",
        `Client-ID OR7v6f0PrFy63FLeKZU_AXlx-vNAt2MWWTeBRVamIF8`
      );
    },
  }),

  endpoints: (builder) => ({
    getRandomPhotos: builder.query<IImage[], number>({
      query: (page: number) => {
        return {
          url: `photos`,
          params: {
            page: page,
            per_page: 2,
          },
        };
      },

      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache?.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getRandomPhotosForStories: builder.query<IImage[], void>({
      query: () => {
        return {
          url: `photos`,
          params: {
            page: 1,
            per_page: 10,
          },
        };
      },
    }),
  }),
});

export const { useGetRandomPhotosQuery, useGetRandomPhotosForStoriesQuery } =
  randomPhotosApi;
