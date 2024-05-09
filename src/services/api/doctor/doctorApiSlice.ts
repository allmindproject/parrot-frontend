import { apiSlice } from "@/services/api/apiSlice";
// TODO nie dziala zapytanie trzeba zmienic backend
type Examination = {
  code: string; // "CARDIO",
  description: string; // "Cardiovascular assessment",
  type: string; // "PHYSICAL",
  rightsLevel: string; // "NONE"
};

export const doctorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchExaminations: builder.query<
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

export const { useSearchExaminationsQuery } = doctorApiSlice;
