import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogTrigger,
  ScrollArea,
  ScrollBar,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { PhysicalExamDialog } from ".";
import { useGetVisitExaminationsQuery } from "../api";
import { handleError } from "@/utils";
import { format } from "date-fns";

type DoctorPhysicalExaminationProps = {
  visitId: number;
};

const DoctorPhysicalExamination: React.FC<DoctorPhysicalExaminationProps> = ({
  visitId,
}) => {
  const [open, setOpen] = useState(false);

  const {
    data: visitExaminations,
    isLoading: isGetVisitExaminationsLoading,
    isError: isGetVisitExaminationsError,
    error: visitExaminationsError,
    refetch: refetchVisitExaminations,
  } = useGetVisitExaminationsQuery({
    visitId: visitId,
    examinationType: "PHYSICAL",
  });

  const physicalVisitExaminations =
    visitExaminations?.physicalExaminationList || [];

  useEffect(() => {
    if (isGetVisitExaminationsError) {
      handleError(visitExaminationsError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGetVisitExaminationsError]);

  if (isGetVisitExaminationsLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="text-2xl font-bold">Physical examinations:</div>
      <ScrollArea className="w-full h-full">
        <div className="flex flex-col gap-4">
          {/* TODO może jakąś tabeleczkę tutaj strzelić????? */}
          {physicalVisitExaminations.length ? (
            physicalVisitExaminations.map((exam) => (
              <Card key={exam.id} className="w-full">
                <CardHeader>
                  <CardTitle>
                    {exam.examinationDictionary.description}
                  </CardTitle>
                  <CardDescription>
                    {format(exam.examinationDateTime, "HH:mm PPPP")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>Result: </strong>
                    {exam.result}
                  </p>
                  <p className="text-sm">
                    <strong>Code: </strong>
                    {exam.examinationDictionary.code}
                  </p>
                  <p className="text-sm">
                    <strong>Rights Level: </strong>
                    {exam.examinationDictionary.rightsLevel}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div>No examinations found.</div>
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="self-end">Add physical examination</Button>
        </DialogTrigger>
        <PhysicalExamDialog
          setOpen={setOpen}
          visitId={visitId}
          refetchVisitExaminations={refetchVisitExaminations}
        />
      </Dialog>
    </div>
  );
};

export { DoctorPhysicalExamination };
