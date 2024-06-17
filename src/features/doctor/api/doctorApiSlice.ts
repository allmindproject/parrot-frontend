import { apiSlice } from "@/services/api/apiSlice";
import {
  Examination,
  ExaminationType,
  LaboratoryExamination,
  PhysicalExamination,
  VisitSearchRequest,
  VisitSearchResponse,
} from "@/types";
import {
  LaboratoryExaminationAddRequest,
  PhysicalExaminationAddRequest,
  VisitExaminationsResponse,
} from "../types";

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
    getVisitExaminations: builder.query<
      VisitExaminationsResponse,
      { visitId: number; examinationType: ExaminationType }
    >({
      query: (vistExamParams) => ({
        url: "/api/doctor/search-visit-examination",
        method: "GET",
        params: vistExamParams,
      }),
    }),
    addPhysicalExamination: builder.mutation<
      PhysicalExamination,
      PhysicalExaminationAddRequest
    >({
      query: (body) => ({
        url: "/api/doctor/add-physical-examination",
        method: "POST",
        body,
      }),
    }),
    addLaboratoryExamination: builder.mutation<
      LaboratoryExamination,
      LaboratoryExaminationAddRequest
    >({
      query: (body) => ({
        url: "/api/doctor/add-lab-examination",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useAddLaboratoryExaminationMutation,
  useAddPhysicalExaminationMutation,
  useGetExaminationsQuery,
  useGetDoctorVisitsQuery,
  useGetVisitExaminationsQuery,
  useGetVisitQuery,
  useLazyGetExaminationsQuery,
  useLazyGetDoctorVisitsQuery,
  useLazyGetVisitExaminationsQuery,
  useLazyGetVisitQuery,
} = doctorApiSlice;
