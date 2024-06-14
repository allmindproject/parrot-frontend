import { apiSlice } from "@/services/api/apiSlice";
import { VisitSearchRequest, VisitSearchResponse } from "@/types";
// TODO nie dziala zapytanie trzeba zmienic backend??
type Examination = {
  code: string; // "CARDIO",
  description: string; // "Cardiovascular assessment",
  type: string; // "PHYSICAL",
  rightsLevel: string; // "NONE"
};

const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorVisits: builder.query<
      VisitSearchResponse[],
      Partial<VisitSearchRequest>
    >({
      query: (visitParams) => ({
        url: "/api/doctor/search-visit",
        method: "GET",
        params: visitParams,
      }),
    }),
    getExaminations: builder.query<
      Examination[],
      { code?: string; description?: string }
    >({
      query: ({ code, description }) => ({
        url: "/api/doctor/search-examination",
        method: "GET",
        params: { code, description },
      }),
    }),
  }),
});

export const {
  useGetExaminationsQuery,
  useGetDoctorVisitsQuery,
  useLazyGetExaminationsQuery,
  useLazyGetDoctorVisitsQuery,
} = doctorApiSlice;
