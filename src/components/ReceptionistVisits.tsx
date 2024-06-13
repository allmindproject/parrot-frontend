import { Trash2 } from "lucide-react";
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
import { VisitSearchResponse } from "@/services/api/receptionist/receptionistApiSlice";
import { format } from "date-fns";

type ReceptionistVisitsProps = {
  visits: VisitSearchResponse[];
  isLoading: boolean;
};

const ReceptionistVisits: React.FC<ReceptionistVisitsProps> = ({
  visits,
  isLoading,
}) => {
  if (isLoading)
    return <div className="text-center w-full">Loading...</div>;
  if (visits.length === 0)
    return <div className="text-center w-full">No visits found.</div>;
  return (
    <ScrollArea className="w-full h-full">
      <div className="flex flex-col gap-4 min-w-[350px]">
        {visits.map((visit) => (
          <Card key={visit.visit.id}>
            <CardHeader className="flex-row justify-between items-start gap-4">
              <div className="space-y-1.5">
                <CardTitle>{`${visit.selectedPatient.person.firstName} ${visit.selectedPatient.person.lastName}`}</CardTitle>
                <CardDescription>
                  {format(visit.visit.scheduledDateTime, "HH:mm PPPP")}
                </CardDescription>
                <CardDescription>{`dr. ${visit.selectedDoctor.clinicStaff.person.firstName} ${visit.selectedDoctor.clinicStaff.person.lastName}`}</CardDescription>
              </div>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Comments:</div>
              <div>{visit.visit.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export { ReceptionistVisits };
