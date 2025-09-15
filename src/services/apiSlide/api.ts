

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the Post type based on JSONPlaceholder API
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

// Auto-generated hooks
export const { useGetPostsQuery, useGetPostByIdQuery } = api;










// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Example: Dummy JSON API
// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
//   endpoints: (builder) => ({
//     getPosts: builder.query<any[], void>({
//       query: () => "/posts",
//     }),
//     getPostById: builder.query<any, number>({
//       query: (id) => `/posts/${id}`,
//     }),
//   }),
// });

// // Auto-generated hooks
// export const { useGetPostsQuery, useGetPostByIdQuery } = api;
