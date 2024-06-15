import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
} from "./ui";
import { useDeleteVisitMutation } from "@/services/api/receptionist";
import { format } from "date-fns";
import { handleError } from "@/utils";
import { useEffect } from "react";
import { toast } from "sonner";
import { VisitSearchResponse } from "@/types";

type ReceptionistVisitsProps = {
  visits: VisitSearchResponse[];
  isLoading: boolean;
  refetchVisits: () => void;
};

const ReceptionistVisits: React.FC<ReceptionistVisitsProps> = ({
  visits,
  isLoading,
  refetchVisits,
}) => {
  const [
    deleteVisit,
    { data: visitDeleteResponse, isSuccess: isDeleteVisitSuccess },
  ] = useDeleteVisitMutation();

  const onDeleteHandler = async (visitId: number) => {
    try {
      await deleteVisit({ visitId: visitId }).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (isDeleteVisitSuccess) {
      toast.success(`Visit deleted successfully`);
      console.log(visitDeleteResponse); // TODO usunac
      refetchVisits();
    }
  }, [isDeleteVisitSuccess, visitDeleteResponse]);

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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the visit.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDeleteHandler(visit.visit.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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

export { ReceptionistVisits };
