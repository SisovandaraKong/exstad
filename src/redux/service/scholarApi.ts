import { useBaseQuery } from "@/hooks/use-base-query";
import { Scholar } from "@/types/scholar";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scholarApi = createApi({
  reducerPath: "scholarApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Scholar"],
  endpoints: (builder) => ({
    getAllScholars: builder.query<Scholar[], void>({
      query: () => "/scholars",
    }),
    getScholarByUsername: builder.query<Scholar, { username: string }>({
      query: ({ username }) => `/scholars/username/${username}`,
    }),
  }),
});

export const { useGetAllScholarsQuery, useGetScholarByUsernameQuery } = scholarApi;
