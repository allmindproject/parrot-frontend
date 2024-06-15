import {
  DoctorLaboratoryExamination,
  DoctorPhysicalExamination,
} from "@/components";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useGetVisitQuery } from "@/services/api/doctor";
import { handleError } from "@/utils";
import { skipToken } from "@reduxjs/toolkit/query";
import { format } from "date-fns";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const VisitDetails: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ visitId: string }>();
  const visitId = params.visitId;

  const {
    data: visit,
    isLoading: isGetVisitLoading,
    isError: isGetVisitError,
    error: visitError,
  } = useGetVisitQuery(visitId ?? skipToken);

  useEffect(() => {
    if (isGetVisitError) {
      handleError(visitError);
      navigate("/doctor");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGetVisitError]);

  console.log(visit);
  if (isGetVisitLoading) return <div className="text-center">Loading...</div>;
  if (!visit)
    return (
      <div className="flex flex-col items-center gap-4">
        <div>Error while loading the visit details.</div>
        <Button asChild>
          <Link to={"/doctor"}>Go back</Link>
        </Button>
      </div>
    );
  return (
    <div className="w-full h-full flex flex-row gap-4">
      <div className="w-2/5 h-full min-w-[250px] flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {`${visit.selectedPatient.person.firstName} ${visit.selectedPatient.person.lastName}`}
              </CardTitle>
              <CardDescription>
                <span className="font-bold">Patient National ID: </span>
                {visit.selectedPatient.person.nationalIDNumber}
              </CardDescription>
              <CardDescription>
                <span className="font-bold">Patient Sex: </span>
                {visit.selectedPatient.person.sex}
              </CardDescription>
              <CardDescription>
                <span className="font-bold">Patient Insurance ID: </span>
                {visit.selectedPatient.insuranceId}
              </CardDescription>
              <CardDescription>
                <span className="font-bold">Doctor Name: </span>
                {`Dr. ${visit.selectedDoctor.clinicStaff.person.firstName} ${visit.selectedDoctor.clinicStaff.person.lastName}`}
              </CardDescription>
              <CardDescription>
                <span className="font-bold">Scheduled Date: </span>
                {format(visit.visit.scheduledDateTime, "PPPP")}
              </CardDescription>
              <CardDescription>
                <span className="font-bold">Scheduled Time: </span>
                {format(visit.visit.scheduledDateTime, "HH:mm")}
              </CardDescription>
              <CardDescription>
                <span className="font-bold">Visit Status: </span>
                {visit.visit.visitStatus}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">Comments:</div>
              <div>{visit.visit.description}</div>
            </CardContent>
          </Card>
          <Button className="self-start" asChild>
            <Link to="#">Full medical history</Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>Visit results:</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <Button variant="outline" asChild className="w-1/2">
          <Link to="/doctor">Back</Link>
        </Button>
      </div>
      <div className="w-3/5 h-full flex flex-col gap-4">
        <DoctorPhysicalExamination visitId={visit.visit.id} />
        <DoctorLaboratoryExamination />
      </div>
    </div>
  );
};

export { VisitDetails };
