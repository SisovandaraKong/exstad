import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type CheckTransactionByMd5Request = { md5: string };
export type CheckTransactionByMd5Response = {
  responseCode: number;
  responseMessage: string;
  errorCode: number | null;
  data: unknown;
};

export const bakongKHQRApi = createApi({
  reducerPath: "bakongKHQRApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    checkTransactionByMd5: builder.mutation<
      CheckTransactionByMd5Response,
      CheckTransactionByMd5Request
    >({
      query: (body) => ({
        url: "/api/bakong",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCheckTransactionByMd5Mutation } = bakongKHQRApi;