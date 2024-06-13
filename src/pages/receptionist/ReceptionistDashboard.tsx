import { ReceptionistVisits } from "@/components";
import { Button, Calendar } from "@/components/ui";
import { useGetVisitsQuery } from "@/services/api/receptionist";
import { handleError } from "@/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReceptionistDashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const {
    data: visitsData = [],
    isLoading: isGetVisitsLoading,
    isError: isGetVisitsError,
    error: visitsError,
  } = useGetVisitsQuery({}, { refetchOnMountOrArgChange: true });

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
          <Button variant="default" onClick={() => navigate("create-visit")}>
            Create new visit
          </Button>
          <Button variant="outline" onClick={() => navigate("all-visits")}>
            See all visits
          </Button>
        </div>
        <ReceptionistVisits
          visits={visitsData}
          isLoading={isGetVisitsLoading}
        />
      </div>
    </div>
  );
};

export { ReceptionistDashboard };
