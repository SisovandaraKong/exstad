import { useBaseQuery } from "@/services/use-base-query";
import { CreateScholarSocialLink, ScholarSocialLink, UpdateScholar } from "@/types/scholar";
import { Scholar } from "@/types/scholar/scholar";
import { createApi } from "@reduxjs/toolkit/query/react";

export const scholarApi = createApi({
  reducerPath: "scholarApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Scholar", "ScholarSocialLink"],
  endpoints: (builder) => ({
    // GET all scholars
    getAllScholars: builder.query<Scholar[], void>({
      query: () => "/api/v1/scholars",
      transformResponse: (response: { scholars: Scholar[] }) =>
        response.scholars,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uuid }) => ({
                type: "Scholar" as const,
                id: uuid,
              })),
              { type: "Scholar", id: "LIST" },
            ]
          : [{ type: "Scholar", id: "LIST" }],
    }),

    // GET scholars by status
    getScholarsByStatus: builder.query<Scholar[], string>({
      query: (status) => `/scholars/status/${status}`,
      transformResponse: (response: { scholars: Scholar[] }) =>
        response.scholars,
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // GET scholar by uuid
    getScholarByUuid: builder.query<Scholar, string>({
      query: (uuid) => `/scholars/${uuid}`,
      providesTags: (result, error, uuid) => [{ type: "Scholar", id: uuid }],
    }),

    // GET scholar by username
    // getScholarByUsername: builder.query<Scholar, string>({
    //   query: (username) => `/scholars/username/${username}`,
    //   providesTags: (result, error, username) => [
    //     { type: "Scholar", id: `username-${username}` },
    //   ],
    // }),
     getScholarByUsername: builder.query<Scholar, string>({
      query: (username) => `/scholars/username/${username}`,
      providesTags: (result, error, username) => [
        { type: "Scholar", id: `username-${username}` },
      ],
    }),

    // Search scholars
    searchScholars: builder.query<
      Scholar[],
      { username?: string; name?: string }
    >({
      query: ({ username = "", name = "" }) =>
        `/scholars/search?username=${username}&name=${name}`,
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // Count scholars
    countScholars: builder.query<number, void>({
      query: () => "/scholars/count",
      transformResponse: (response: { scholars: number }) => response.scholars,
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // Get "me"
    getMe: builder.query<Scholar, void>({
      query: () => "/scholars/me",
      providesTags: [{ type: "Scholar", id: "me" }],
    }),

    // Update "me"
    updateMe: builder.mutation<Scholar, UpdateScholar>({
      query: (body) => ({
        url: "/scholars/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Scholar", id: "me" }],
    }),

    // Scholar social links
    getScholarSocialLinks: builder.query<ScholarSocialLink[], string>({
      query: (uuid) => `/scholars/${uuid}/social-links`,
      providesTags: (result, error, uuid) => [
        { type: "ScholarSocialLink", id: `scholar-${uuid}` },
      ],
    }),

    addScholarSocialLink: builder.mutation<
      ScholarSocialLink,
      { uuid: string; body: CreateScholarSocialLink }
    >({
      query: ({ uuid, body }) => ({
        url: `/scholars/${uuid}/social-links`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { uuid }) => [
        { type: "ScholarSocialLink", id: `scholar-${uuid}` },
      ],
    }),

    updateSocialLinkStatus: builder.mutation<
      ScholarSocialLink,
      { scholarUuid: string; socialLinkUuid: string; status: boolean }
    >({
      query: ({ scholarUuid, socialLinkUuid, status }) => ({
        url: `/scholars/${scholarUuid}/social-link/${socialLinkUuid}`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: (result, error, { scholarUuid }) => [
        { type: "ScholarSocialLink", id: `scholar-${scholarUuid}` },
      ],
    }),

    deleteSocialLink: builder.mutation<
      void,
      { scholarUuid: string; socialLinkUuid: string }
    >({
      query: ({ scholarUuid, socialLinkUuid }) => ({
        url: `/scholars/${scholarUuid}/social-link/${socialLinkUuid}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { scholarUuid }) => [
        { type: "ScholarSocialLink", id: `scholar-${scholarUuid}` },
      ],
    }),

    // Scholars by opening program
    getScholarsByOpeningProgram: builder.query<Scholar[], string>({
      query: (uuid) => `/scholars/${uuid}/opening-program`,
      transformResponse: (response: {
        "opening-program-scholars": Scholar[];
      }) => response["opening-program-scholars"],
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllScholarsQuery,
  useGetScholarsByStatusQuery,
  useGetScholarByUuidQuery,
  useGetScholarByUsernameQuery,
  useSearchScholarsQuery,
  useCountScholarsQuery,
  useGetMeQuery,
  useUpdateMeMutation,
  useGetScholarSocialLinksQuery,
  useAddScholarSocialLinkMutation,
  useUpdateSocialLinkStatusMutation,
  useDeleteSocialLinkMutation,
  useGetScholarsByOpeningProgramQuery,
} = scholarApi;
