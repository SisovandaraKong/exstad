/**
 * API slice for managing roadmaps (get, update).
 * Add more endpoints as needed (e.g., POST, DELETE).
 */
/**
 * Endpoints:
 * GET    {{spring-local}}/api/v1/programs/{{uuid}}/roadmaps
 * PUT    {{spring-local}}/api/v1/programs/{{uuid}}/roadmaps
 *
 * Usage:
 * export const {
 *   useGetAllRoadmapsQuery,
 *   useUpdateRoadmapsMutation,
 * } = roadmapApi;
 *
 * // For program overviews:
 * export const {
 *   useGetAllProgramOverviewQuery,
 *   useUpdateProgramOverviewMutation,
 * } = programOverviewsApi;
 */

import { createApi } from "@reduxjs/toolkit/query/react"
import type { RoadmapResponse } from "@/types/roadmap"
import { useBaseQuery } from "@/services/use-base-query"

export const roadmapApi = createApi({
  reducerPath: "roadmapApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Roadmaps"],
  endpoints: (builder) => ({
    getAllRoadmaps: builder.query<RoadmapResponse, string>({
      query: (programUuid) => `/programs/${programUuid}/roadmaps`,
      providesTags: (result, error, uuid) =>
        result
          ? [
              ...result.map((_, index) => ({
                type: "Roadmaps" as const,
                id: `${uuid}-${index}`,
              })),
              { type: "Roadmaps", id: "LIST" },
            ]
          : [{ type: "Roadmaps", id: "LIST" }],
    }),

  
  }),
})

export const { useGetAllRoadmapsQuery } = roadmapApi
