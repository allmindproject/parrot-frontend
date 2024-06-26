import { LabExaminationStatus, RightsLevel } from "@/types";

type LabExaminationSearchRequest = {
  status: LabExaminationStatus;
  examinationCode: string;
  labAssistantId: string;
  rightsLevel: RightsLevel;
  orderedDateTime: string;
};
export type { LabExaminationSearchRequest };
