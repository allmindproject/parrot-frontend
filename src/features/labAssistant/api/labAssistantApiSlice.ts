import { apiSlice } from "@/services/api/apiSlice";
import { LaboratoryExamination } from "@/types";

type ExaminationSearchRequest = unknown; //TODO

const labAssistantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabExaminations: builder.query<
      LaboratoryExamination[],
      Partial<ExaminationSearchRequest>
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
