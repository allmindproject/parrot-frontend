import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
} from "@/components/ui";
//TODO
const DoctorLaboratoryExamination: React.FC = () => {
  return (
    <>
      <Card className="h-1/2 overflow-y-hidden">
        <CardHeader>
          <CardTitle>Laboratory exams:</CardTitle>
        </CardHeader>
        <ScrollArea className="h-full">
          <CardContent>
            <div>Laboratory exams</div>
            <div>Laboratory exams</div>
            <div>Laboratory exams</div>
            <div>Laboratory exams</div>
            <div>Laboratory exams</div>
            <div>Laboratory exams</div>
            <div>Laboratory exams</div>
          </CardContent>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </Card>
      <Button className="self-end">Order laboratory exam</Button>
    </>
  );
};

export { DoctorLaboratoryExamination };
