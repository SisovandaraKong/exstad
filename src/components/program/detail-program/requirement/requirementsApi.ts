import { useBaseQuery } from "@/services/use-base-query";
import { RequirementsType } from "@/types/master-program";
import { createApi } from "@reduxjs/toolkit/query/react";

// --- Payload type for backend ---
export type RequirementPayload = {
  title: string;
  subtitle?: string;
  description: string[]; // sections
};
export const requiementApi = createApi({
  reducerPath: "requiementsApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Requirements"],
  endpoints: (builder) => ({
    // --- GET all requirements ---
    getAllRequirements: builder.query<RequirementsType[], string>({
      query: (programUuid) => `/programs/${programUuid}/requirements`,
      providesTags: (result, error, uuid) =>
        result
          ? [
              ...result.map((_, index) => ({
                type: "Requirements" as const,
                id: `${uuid}-${index}`,
              })),
              { type: "Requirements", id: "LIST" },
            ]
          : [{ type: "Requirements", id: "LIST" }],
    }),

    // --- UPDATE requirements (replace full array) ---
    updateRequirements: builder.mutation<
      void,
      { programUuid: string; requirements: RequirementPayload[] }
    >({
      query: ({ programUuid, requirements }) => ({
        url: `/programs/${programUuid}/requirements`,
        method: "PUT",
        body: requirements, // backend expects array of {title, subtitle, description}
      }),
      invalidatesTags: [{ type: "Requirements", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllRequirementsQuery,
  useUpdateRequirementsMutation,
  // useUpdateRequirementSectionsMutation,
} = requiementApi;
