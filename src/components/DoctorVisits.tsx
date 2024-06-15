import { VisitSearchResponse } from "@/types";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
} from "./ui";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type DoctorVisitsProps = {
  visits: VisitSearchResponse[];
  isLoading: boolean;
};

const DoctorVisits: React.FC<DoctorVisitsProps> = ({ visits, isLoading }) => {
  if (isLoading) return <div className="text-center w-full">Loading...</div>;
  if (visits.length === 0)
    return <div className="text-center w-full">No visits found.</div>;
  return (
    <ScrollArea className="w-full h-full">
      <div className="flex flex-col gap-4 min-w-[350px]">
        {visits.map((visit) => (
          <Card key={visit.visit.id}>
            <CardHeader className="flex-row justify-between items-start gap-4">
              <div className="space-y-1.5">
                <CardTitle className="text-2xl font-bold">{`${visit.selectedPatient.person.firstName} ${visit.selectedPatient.person.lastName}`}</CardTitle>
                <CardDescription>
                  {format(visit.visit.scheduledDateTime, "HH:mm PPPP")}
                </CardDescription>
                <CardDescription>{`Dr. ${visit.selectedDoctor.clinicStaff.person.firstName} ${visit.selectedDoctor.clinicStaff.person.lastName}`}</CardDescription>
              </div>
              <Button asChild>
                <Link to={`/doctor/visit-details/${visit.visit.id}`}>
                  Visit details
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Comments:</div>
              <div>{visit.visit.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export { DoctorVisits };
