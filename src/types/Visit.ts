import { LaboratoryExamination, PhysicalExamination } from ".";

type Visit = {
  description: string;
  diagnostics: unknown; //TODO
  id: number;
  labExaminationList: LaboratoryExamination[];
  physicalExaminationList: PhysicalExamination[];
  scheduledDateTime: Date; // TODO czy string
  visitStatus: string; // TODO maybe enum
};
export type { Visit };
