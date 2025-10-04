import { createApi } from "@reduxjs/toolkit/query/react";
import { useBaseQuery } from "@/services/use-base-query";
import { Enrollment } from "@/types/enrollment";

export type EnrollmentRequest = {
  englishName: string;
  khmerName: string;
  openingProgramUuid: string;
  gender: string;
  dob: string;
  phoneNumber: string;
  email: string;
  avatar?: string;
  province?: string;
  currentAddress: string;
  university: string;
  educationQualification: string;
  extra?: Record<string, string>;
};


export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  baseQuery: useBaseQuery,
  endpoints: (builder) => ({
    createEnrollment: builder.mutation<Enrollment, EnrollmentRequest>({
      query: (body) => ({
        url: "/enrollments",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateEnrollmentMutation } = enrollmentApi;
