import { apiSlice } from "@/services/api/apiSlice";

type Person = {
  firstName: string;
  lastName: string;
  nationalIDNumber: string; //or number
  sex: "FEMALE" | "MALE";
};

type Visit = unknown //TODO

type PatientSearchResponse = {
  insuranceId: string;
  person: Person;
  visitList: Visit[]
};

type DoctorSearchResponse = {
  firstName: string;
  //TODO
};

type PatientSearchRequest = {
  firstName: string;
  lastName: string;
  nationalIdNumber: number;
  insuranceId: number;
};

type DoctorSearchRequest = {
  firstName: string;
  lastName: string;
  nationalIdNumber: number;
  npwzId: number;
};

export const receptionistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query<
      // Partial<Patient>[],
      unknown,
      Partial<PatientSearchRequest>
    >({
      query: (patientSearchRequest) => ({
        url: "/api/receptionist/search-patient",
        method: "GET",
        params: patientSearchRequest,
      }),
    }),
    getDoctor: builder.query<unknown, Partial<DoctorSearchRequest>>({
      query: (doctorSearchRequest) => ({
        url: "/api/receptionist/search-doctor",
        method: "GET",
        params: doctorSearchRequest,
      }),
    }),
    createVisit: builder.mutation<unknown, unknown>({
      query: (body) => ({
        url: "/api/receptionist/create-visit",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPatientQuery,
  useLazyGetPatientQuery,
  useGetDoctorQuery,
  useLazyGetDoctorQuery,
} = receptionistApiSlice;
