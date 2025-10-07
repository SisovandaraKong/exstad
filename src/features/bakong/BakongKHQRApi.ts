// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "@/lib/baseQuery";

// export type CheckTransactionByMd5Request = {
//   md5: string;
// };

// export type CheckTransactionByMd5Response = {
//   responseCode: number;
//   responseMessage: string;
//   errorCode: number;
//   data: any;
// }; 

// export const bakongKHQRApi = createApi({
//   reducerPath: "bakongKHQRApi",
//   baseQuery,
//   endpoints: (builder) => ({
//     checkTransactionByMd5: builder.mutation<CheckTransactionByMd5Response, CheckTransactionByMd5Request>({
//       query: (body) => ({
//         url: "/v1/check_transaction_by_md5",
//         method: "POST",
//         body,
//       }),
//     }),
//   }),
// });

// export const { useCheckTransactionByMd5Mutation } = bakongKHQRApi;
