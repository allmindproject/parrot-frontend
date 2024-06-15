import { AllVisitsSearch, ReceptionistVisits } from "@/components";
import { useGetReceptionistVisitsQuery } from "@/features/receptionist/api";
import { VisitSearchRequest } from "@/types";
import { handleError } from "@/utils";
import { useEffect, useState } from "react";

const ReceptionistAllVisits: React.FC = () => {
  const [searchParams, setSearchParams] = useState<Partial<VisitSearchRequest>>(
    {}
  );

  const {
    data: visitData = [],
    isLoading: isGetVisitsLoading,
    isError: isGetVisitsError,
    error: visitsError,
    refetch: refetchVisits,
  } = useGetReceptionistVisitsQuery(searchParams, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isGetVisitsError) {
      handleError(visitsError);
    }
  }, [isGetVisitsError, visitsError]);

  return (
    <div className="h-full flex justify-between items-start gap-4">
      <AllVisitsSearch
        setSearchParams={setSearchParams}
        isGetVisitsLoading={isGetVisitsLoading}
      />
      <ReceptionistVisits
        visits={visitData}
        isLoading={isGetVisitsLoading}
        refetchVisits={refetchVisits}
      />
    </div>
  );
};

export { ReceptionistAllVisits };
