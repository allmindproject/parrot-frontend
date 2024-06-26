import { apiSlice } from "@/services/api/apiSlice";
import { LabExaminationSearchRequest, LaboratoryExamination } from "@/types";

const labAssistantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssistantExaminations: builder.query<
      LaboratoryExamination[],
      Partial<LabExaminationSearchRequest>
    >({
      query: (examParams) => ({
        url: "/api/assistant/search-examination",
        method: "GET",
        params: examParams,
      }),
    }),
  }),
});

export const {
  useGetAssistantExaminationsQuery,
  useLazyGetAssistantExaminationsQuery,
} = labAssistantApiSlice;
