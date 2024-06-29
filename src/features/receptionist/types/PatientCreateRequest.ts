import { Sex } from "@/types";
//TODO
type PatientCreateRequest = {
  firstName: string;
  lastName: string;
  nationalIDNumber: string;
  insuranceId: string;
  sex: Sex;
};
export type { PatientCreateRequest };
