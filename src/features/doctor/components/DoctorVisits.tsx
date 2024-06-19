import { VisitSearchResponse } from "@/types";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
} from "@/components/ui";
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
                <CardTitle className="flex flex-row gap-4">
                  <div className="font-bold">
                    {`${visit.selectedPatient.person.firstName} ${visit.selectedPatient.person.lastName}`}
                  </div>
                  <Badge variant="secondary">{visit.visit.visitStatus}</Badge>
                </CardTitle>
                <CardDescription>
                  {format(visit.visit.scheduledDateTime, "HH:mm PPPP")}
                </CardDescription>
              </div>
              <Button asChild>
                <Link to={`/doctor/visit-details/${visit.visit.id}`}>
                  Visit details
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                <strong>Doctor: </strong>
                {`Dr. ${visit.selectedDoctor.clinicStaff.person.firstName} ${visit.selectedDoctor.clinicStaff.person.lastName}`}
              </p>
              <p className="text-sm">
                <strong>Comments: </strong>
                {visit.visit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export { DoctorVisits };
