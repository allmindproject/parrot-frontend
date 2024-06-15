import { apiSlice } from "@/services/api/apiSlice";
import {
  Examination,
  PhysicalExaminationAddRequest,
  PhysicalExaminationAddResponse,
  VisitSearchRequest,
  VisitSearchResponse,
} from "@/types";

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
    getVisit: builder.query<VisitSearchResponse, string>({
      query: (visitId) => ({
        url: `/api/doctor/get-visit/${visitId}`,
        method: "GET",
      }),
    }),
    getExaminations: builder.query<
      Examination[],
      { code?: string; description?: string }
    >({
      query: (examParams) => ({
        url: "/api/doctor/search-examination",
        method: "GET",
        params: examParams,
      }),
    }),
    addPhysicalExamination: builder.mutation<
      PhysicalExaminationAddResponse,
      PhysicalExaminationAddRequest
    >({
      query: (body) => ({
        url: "/api/doctor/add-physical-examination",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useAddPhysicalExaminationMutation,
  useGetExaminationsQuery,
  useGetDoctorVisitsQuery,
  useGetVisitQuery,
  useLazyGetExaminationsQuery,
  useLazyGetDoctorVisitsQuery,
  useLazyGetVisitQuery,
} = doctorApiSlice;
