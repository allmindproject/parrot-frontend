import { Examination } from ".";

type PhysicalExaminationAddResponse = {
  examinationDateTime: string;
  examinationDictionary: Examination;
  id: number;
  result: string;
};
export type { PhysicalExaminationAddResponse };
