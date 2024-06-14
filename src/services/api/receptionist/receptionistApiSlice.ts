import { apiSlice } from "@/services/api/apiSlice";
//fest mi sie nie podobaja te wszystkie typy w tym miejscu, ale jeszcze mysle jak to rozwiazac
type Person = {
  firstName: string;
  lastName: string;
  nationalIDNumber: string;
  sex: "FEMALE" | "MALE";
};

type labExamination = unknown; //TODO
type physicalExamination = unknown; //TODO

type Visit = {
  description: string;
  diagnostics: unknown; //TODO
  id: number;
  labExaminationList: labExamination[];
  physicalExaminationList: physicalExamination[];
  scheduledDateTime: Date; // TODO czy string
  visitStatus: string; // TODO maybe enum
};

type ClinicStaff = {
  clinicEmpId: number;
  person: Person;
};

type Doctor = {
  clinicStaff: ClinicStaff;
  id: number;
  npwzId: string;
};

type Receptionist = {
  clinicStaff: ClinicStaff;
  id: number;
};

type Patient = {
  insuranceId: string;
  person: Person;
};

type PatientSearchResponse = Patient & { visitList: Visit[] };

type PatientSearchRequest = {
  firstName: string;
  lastName: string;
  nationalIdNumber: number;
  insuranceId: number;
};

type DoctorSearchResponse = Doctor & { visitList: Visit[] };

type DoctorSearchRequest = {
  firstName: string;
  lastName: string;
  nationalIdNumber: number;
  npwzId: number;
};

type VisitCreateResponse = Visit & {
  patient: Patient;
  receptionist: Receptionist;
  selectedDoctor: Doctor;
};

export type VisitCreateRequest = {
  description: string;
  doctorNpwzId: string;
  patientInsuranceId: string;
  scheduledDateTime: string;
};

export type VisitDeleteResponse = unknown; //TODO

export type VisitDeleteRequest = {
  visitId: number;
};

export type VisitSearchResponse = {
  selectedDoctor: Doctor;
  selectedPatient: Patient;
  visit: Visit;
};

export type VisitSearchRequest = {
  patientFirstName: string;
  patientLastName: string;
  patientInsuranceId: string;
  doctorFirstName: string;
  doctorLastName: string;
  doctorNpwzId: string;
};

export const receptionistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<
      PatientSearchResponse[],
      Partial<PatientSearchRequest>
    >({
      query: (patientParams) => ({
        url: "/api/receptionist/search-patient",
        method: "GET",
        params: patientParams,
      }),
    }),
    getDoctors: builder.query<
      DoctorSearchResponse[],
      Partial<DoctorSearchRequest>
    >({
      query: (doctorParams) => ({
        url: "/api/receptionist/search-doctor",
        method: "GET",
        params: doctorParams,
      }),
    }),
    getVisits: builder.query<
      VisitSearchResponse[],
      Partial<VisitSearchRequest>
    >({
      query: (visitParams) => ({
        url: "/api/receptionist/search-visit",
        method: "GET",
        params: visitParams,
      }),
    }),
    createVisit: builder.mutation<VisitCreateResponse, VisitCreateRequest>({
      query: (body) => ({
        url: "/api/receptionist/create-visit",
        method: "POST",
        body,
      }),
    }),
    deleteVisit: builder.mutation<VisitDeleteResponse, VisitDeleteRequest>({
      query: (body) => ({
        url: "/api/receptionist/cancel-visit",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateVisitMutation,
  useDeleteVisitMutation,
  useGetDoctorsQuery,
  useGetPatientsQuery,
  useGetVisitsQuery,
  useLazyGetDoctorsQuery,
  useLazyGetPatientsQuery,
  useLazyGetVisitsQuery,
} = receptionistApiSlice;
