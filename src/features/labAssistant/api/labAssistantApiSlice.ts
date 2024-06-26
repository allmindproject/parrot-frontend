import { apiSlice } from "@/services/api/apiSlice";
import { LaboratoryExamination } from "@/types";
import { LabExaminationSearchRequest } from "../types";

const labAssistantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabExaminations: builder.query<
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

export const { useGetLabExaminationsQuery, useLazyGetLabExaminationsQuery } =
  labAssistantApiSlice;
