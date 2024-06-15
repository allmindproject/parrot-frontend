import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogTrigger,
  ScrollArea,
  ScrollBar,
} from "./ui";
import { PhysicalExamDialog } from ".";
import { useState } from "react";
//TODO
type DoctorPhysicalExaminationProps = {
  visitId: number;
};

const DoctorPhysicalExamination: React.FC<DoctorPhysicalExaminationProps> = ({visitId}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="h-1/2 overflow-y-hidden">
        <CardHeader>
          <CardTitle>Physical examinations:</CardTitle>
        </CardHeader>
        <ScrollArea className="h-full">
          <CardContent>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
            <div>Physical exams</div>
          </CardContent>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="self-end">Add physical examination</Button>
        </DialogTrigger>
        <PhysicalExamDialog setOpen={setOpen} visitId={visitId} />
      </Dialog>
    </>
  );
};

export { DoctorPhysicalExamination };
