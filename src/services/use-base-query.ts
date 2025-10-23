// services/baseQueryPublic.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const useBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  });

  // 1️⃣ Get the logged-in session from NextAuth
  const session = await getSession();
  const token = session?.accessToken;

  // 2️⃣ Add Authorization header automatically if token exists
  let modifiedArgs = args;
  if (typeof args === "string") {
    modifiedArgs = { url: args };
  }
  modifiedArgs.headers = {
    ...(modifiedArgs.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // 3️⃣ Execute the API request
  const result = await rawBaseQuery(modifiedArgs, api, extraOptions);

  // 4️⃣ Optionally handle unauthorized responses (token expired)
  if (result.error && result.error.status === 401) {
    console.warn("Unauthorized — token may be expired");
  }

  return result;
};
