import { Button, Calendar } from "@/components/ui";
import { useGetReceptionistVisitsQuery } from "@/features/receptionist/api";
import { handleError } from "@/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReceptionistVisits } from "../components";

const ReceptionistDashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const {
    data: visitsData = [],
    isLoading: isGetVisitsLoading,
    isError: isGetVisitsError,
    error: visitsError,
    refetch: refetchVisits,
  } = useGetReceptionistVisitsQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isGetVisitsError) {
      handleError(visitsError);
    }
  }, [isGetVisitsError, visitsError]);

  return (
    <div className="h-full flex justify-between items-start gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="border rounded-md p-4"
      />
      <div className="w-full h-full flex flex-col gap-4">
        <div className="flex justify-end gap-4">
          <Button variant="default" asChild>
            <Link to={"create-visit"}>Create new visit</Link>
          </Button>
          <Button variant="outline">
            <Link to={"all-visits"}>See all visits</Link>
          </Button>
        </div>
        <ReceptionistVisits
          visits={visitsData}
          isLoading={isGetVisitsLoading}
          refetchVisits={refetchVisits}
        />
      </div>
    </div>
  );
};

export { ReceptionistDashboard };
