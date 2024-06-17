import { Examination } from "@/types";

type LaboratoryExamination = {
  approvalDateTime: Date;
  cancellationReason: string;
  doctorNotices: string;
  examinationDictionary: Examination;
  executionDateTime: Date;
  id: number;
  labAssistant: unknown; //TODO
  labSupervisor: unknown; //TODO
  orderedDateTime: Date;
  result: string;
  status: string;
  supervisorNotices: string;
};
export type { LaboratoryExamination };
