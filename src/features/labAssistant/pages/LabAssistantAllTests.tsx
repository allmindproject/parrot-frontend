import { handleError } from "@/utils";
import { useEffect, useState } from "react";
import { LabExaminationSearchRequest } from "../types";
import { AllTestsSearch, LabAssistantExaminations } from "../components";
import { useGetLabExaminationsQuery } from "../api";

const LabAssistantAllTests: React.FC = () => {
  const [searchParams, setSearchParams] = useState<
    Partial<LabExaminationSearchRequest>
  >({});

  const {
    data: labExaminations = [],
    isLoading: isGetLabExaminationsLoading,
    isError: isGetLabExaminationsError,
    error: labExaminationsError,
  } = useGetLabExaminationsQuery(searchParams, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isGetLabExaminationsError) {
      handleError(labExaminationsError);
    }
  }, [isGetLabExaminationsError, labExaminationsError]);

  return (
    <div className="h-full flex justify-between items-start gap-4">
      <AllTestsSearch
        setSearchParams={setSearchParams}
        isGetLabExaminationsLoading={isGetLabExaminationsLoading}
      />
      <LabAssistantExaminations
        examinations={labExaminations}
        isLoading={isGetLabExaminationsLoading}
      />
    </div>
  );
};

export { LabAssistantAllTests };
