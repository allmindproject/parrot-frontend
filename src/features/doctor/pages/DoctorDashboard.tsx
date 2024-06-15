import { DoctorVisits } from "@/components";
import { Button, Calendar } from "@/components/ui";
import { useGetDoctorVisitsQuery } from "@/features/doctor/api";
import { handleError } from "@/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DoctorDashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const {
    data: visitsData = [],
    isLoading: isGetVisitsLoading,
    isSuccess,
    isError: isGetVisitsError,
    error: visitsError,
  } = useGetDoctorVisitsQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isGetVisitsError) {
      console.log("z DoctorDashboard");
      handleError(visitsError);
    }
    if (isSuccess) {
      console.log(visitsData);
    }
  }, [isGetVisitsError, visitsError, isSuccess, visitsData]);

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
            <Link to={`all-visits`}>See all visits</Link>
          </Button>
        </div>
        <DoctorVisits visits={visitsData} isLoading={isGetVisitsLoading} />
      </div>
    </div>
  );
};

export { DoctorDashboard };
