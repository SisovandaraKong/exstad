import { useBaseQuery } from "@/services/use-base-query";
import { CurriculumType } from "@/types/master-program";
import { createApi } from "@reduxjs/toolkit/query/react";

export type CurriculumPayload = {
  order: number;
  title: string;
  subtitle?: string;
  description: string[];
};

export const curriculumApi = createApi({
  reducerPath: "curriculumApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Curriculums"],
  endpoints: (builder) => ({ 
    // Master Program
    getMasterCurriculums: builder.query<CurriculumType[], string>({
      query: (programUuid) => `/programs/${programUuid}/curriculums`,
      providesTags: (result, error, uuid) =>
        result
          ? [
              ...result.map((_, index) => ({
                type: "Curriculums" as const,
                id: `${uuid}-${index}`,
              })),
              { type: "Curriculums", id: "LIST" },
            ]
          : [{ type: "Curriculums", id: "LIST" }],
    }),
    updateMasterCurriculums: builder.mutation<
      void,
      { programUuid: string; curriculums: CurriculumPayload[] }
    >({
      query: ({ programUuid, curriculums }) => ({
        url: `/programs/${programUuid}/curriculums`,
        method: "PUT",
        body: curriculums,
      }),
      invalidatesTags: [{ type: "Curriculums", id: "LIST" }],
    }),

    // Opening Program
    getOpeningCurriculums: builder.query<CurriculumType[], string>({
      query: (openingProgramUuid) =>
        `/api/v1/opening-programs/${openingProgramUuid}/curriculums`,
      providesTags: (result, error, uuid) =>
        result
          ? [
              ...result.map((_, index) => ({
                type: "Curriculums" as const,
                id: `${uuid}-${index}`,
              })),
              { type: "Curriculums", id: "LIST" },
            ]
          : [{ type: "Curriculums", id: "LIST" }],
    }),
    updateOpeningCurriculums: builder.mutation<
      void,
      { openingProgramUuid: string; curriculums: CurriculumPayload[] }
    >({
      query: ({ openingProgramUuid, curriculums }) => ({
        url: `/api/v1/opening-programs/${openingProgramUuid}/curriculums`,
        method: "PUT",
        body: curriculums,
      }),
      invalidatesTags: [{ type: "Curriculums", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMasterCurriculumsQuery,
  useUpdateMasterCurriculumsMutation,
  useGetOpeningCurriculumsQuery,
  useUpdateOpeningCurriculumsMutation,
} = curriculumApi;
