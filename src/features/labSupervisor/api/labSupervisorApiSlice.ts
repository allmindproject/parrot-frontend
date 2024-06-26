import { apiSlice } from "@/services/api/apiSlice";
import { LabExaminationSearchRequest, LaboratoryExamination } from "@/types";

const labSupervisorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupervisorExaminations: builder.query<
      LaboratoryExamination[],
      Partial<LabExaminationSearchRequest>
    >({
      query: (examParams) => ({
        url: "/api/supervisor/search-examination",
        method: "GET",
        params: examParams,
      }),
    }),
  }),
});

export const {
  useGetSupervisorExaminationsQuery,
  useLazyGetSupervisorExaminationsQuery,
} = labSupervisorApiSlice;
