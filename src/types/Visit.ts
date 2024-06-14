import { LabExamination, PhysicalExamination } from ".";

type Visit = {
  description: string;
  diagnostics: unknown; //TODO
  id: number;
  labExaminationList: LabExamination[];
  physicalExaminationList: PhysicalExamination[];
  scheduledDateTime: Date; // TODO czy string
  visitStatus: string; // TODO maybe enum
};
export type { Visit };
