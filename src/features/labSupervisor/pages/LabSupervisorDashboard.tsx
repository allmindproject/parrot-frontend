import { Button, Calendar } from "@/components/ui";
import { useGetSupervisorExaminationsQuery } from "../api";
import { handleError } from "@/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LabSupervisorExaminations } from "../components";

const LabSupervisorDashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const {
    data: examinations = [],
    isLoading: isGetLabExaminationsLoading,
    isError: isGetLabExaminationsError,
    error: examinationsError,
  } = useGetSupervisorExaminationsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isGetLabExaminationsError) {
      handleError(examinationsError);
    }
  }, [isGetLabExaminationsError, examinationsError]);

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
          <Button variant="outline" asChild>
            <Link to={`all-tests`}>See all tests</Link>
          </Button>
        </div>
        <LabSupervisorExaminations
          examinations={examinations}
          isLoading={isGetLabExaminationsLoading}
        />
      </div>
    </div>
  );
};

export { LabSupervisorDashboard };
