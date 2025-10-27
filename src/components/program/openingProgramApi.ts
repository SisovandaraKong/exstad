import { createApi } from "@reduxjs/toolkit/query/react";
import { useBaseQuery } from "@/services/use-base-query";
import { openingProgramCreate, openingProgramType } from "@/types/opening-program";

export const openingProgramApi = createApi({
    reducerPath: "openingProgramApi",
    baseQuery: useBaseQuery,
    tagTypes: ["OpeningProgram"],
    endpoints: (builder) => ({

        // GET all opening programs
        getAllOpeningPrograms: builder.query<openingProgramType[], void>({
            query: () => "/opening-programs",
            transformResponse: (response: { "opening-programs"?: openingProgramType[] }) =>
            response["opening-programs"] ?? [],
            providesTags: (result) =>
                result?.length
                    ? [
                          ...result.map(({ programUuid }) => ({
                              type: "OpeningProgram" as const,
                              id: programUuid,
                          })),
                          { type: "OpeningProgram", id: "LIST" },
                      ]
                    : [{ type: "OpeningProgram", id: "LIST" }],
        }),

        // GET single opening program by UUID
        getOpeningProgramByUuid: builder.query<openingProgramType, { uuid: string }>({
            query: ({ uuid }) => `/opening-programs/${uuid}`,
            providesTags: (result) =>
                result ? [{ type: "OpeningProgram", id: result.programUuid }] : [],
        }),

        // Get single opening program by slug 
        getOpeningProgramBySlug: builder.query<openingProgramType , {slug:string}> ({
            query: ({slug}) => `/opening-programs/slug/${slug}`,
            providesTags: (result) => 
                result ? [{type: "OpeningProgram", id: result.slug}] : [],
        }),

        // CREATE opening program
        createOpeningProgram: builder.mutation<openingProgramType, openingProgramCreate>({
            query: (body) => ({
                url: "/opening-programs",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "OpeningProgram", id: "LIST" }],
        }),

        // UPDATE opening program
        updateOpeningProgram: builder.mutation<
            openingProgramType,
            { uuid: string; body: openingProgramCreate }
        >({
            query: ({ uuid, body }) => ({
                url: `/opening-programs/${uuid}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, { uuid }) => [
                { type: "OpeningProgram", id: uuid },
            ],
        }),

        // DELETE opening program
        deleteOpeningProgram: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `/opening-programs/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, uuid) => [
                { type: "OpeningProgram", id: uuid },
                { type: "OpeningProgram", id: "LIST" },
            ],
        }),
                // Fetch a single master program by TITLE
        getOpeningProgramByTitle: builder.query<openingProgramType, { title: string }>({
            query: ({ title }) => `/opening-programs/title/${title}`,
            providesTags: (result) =>
                result ? [{ type: "OpeningProgram", id: result.uuid }] : [],
        }),
    }),
});

// Export hooks
export const {
    useGetAllOpeningProgramsQuery,
    useGetOpeningProgramByTitleQuery,
    useGetOpeningProgramByUuidQuery,
    useGetOpeningProgramBySlugQuery,
    useCreateOpeningProgramMutation,
    useUpdateOpeningProgramMutation,
    useDeleteOpeningProgramMutation,
} = openingProgramApi;
