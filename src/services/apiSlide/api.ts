import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Example: Dummy JSON API
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => "/posts",
    }),
    getPostById: builder.query<any, number>({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

// Auto-generated hooks
export const { useGetPostsQuery, useGetPostByIdQuery } = api;
