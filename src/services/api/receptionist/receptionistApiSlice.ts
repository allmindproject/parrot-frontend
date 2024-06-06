import { apiSlice } from "@/services/api/apiSlice";

type Person = {
  firstName: string;
  lastName: string;
  nationalIDNumber: string;
  sex: "FEMALE" | "MALE";
};

type Visit = unknown; //TODO

type ClinicStaff = {
  clinicEmpId: number;
  person: Person;
};

type PatientSearchResponse = {
  insuranceId: string;
  person: Person;
  visitList: Visit[];
};

type PatientSearchRequest = {
  firstName: string;
  lastName: string;
  nationalIdNumber: number;
  insuranceId: number;
};

type DoctorSearchResponse = {
  clinicStaff: ClinicStaff;
  id: number;
  npwzId: string;
  visitList: Visit[];
};

type DoctorSearchRequest = {
  firstName: string;
  lastName: string;
  nationalIdNumber: number;
  npwzId: number;
};

type VisitCreateResponse = unknown;
// {
//   description: string;
//   doctorNpwzId: string;
//   patientInsuranceId: string;
//   scheduledDateTime: Date;
// };

export type VisitCreateRequest = {
  description: string;
  doctorNpwzId: string;
  patientInsuranceId: string;
  scheduledDateTime: string;
};

export const receptionistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query<
      PatientSearchResponse[],
      Partial<PatientSearchRequest>
    >({
      query: (patientSearchRequest) => ({
        url: "/api/receptionist/search-patient",
        method: "GET",
        params: patientSearchRequest,
      }),
    }),
    getDoctor: builder.query<
      DoctorSearchResponse[],
      Partial<DoctorSearchRequest>
    >({
      query: (doctorSearchRequest) => ({
        url: "/api/receptionist/search-doctor",
        method: "GET",
        params: doctorSearchRequest,
      }),
    }),
    createVisit: builder.mutation<VisitCreateResponse, VisitCreateRequest>({
      query: (body) => ({
        url: "/api/receptionist/create-visit",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateVisitMutation,
  useGetDoctorQuery,
  useGetPatientQuery,
  useLazyGetDoctorQuery,
  useLazyGetPatientQuery,
} = receptionistApiSlice;
