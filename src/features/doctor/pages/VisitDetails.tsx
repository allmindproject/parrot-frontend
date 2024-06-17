import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useGetVisitQuery } from "@/features/doctor/api";
import { handleError } from "@/utils";
import { skipToken } from "@reduxjs/toolkit/query";
import { format } from "date-fns";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DoctorLaboratoryExamination,
  DoctorPhysicalExamination,
} from "../components";

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
      <div className="w-2/5 h-full min-w-[286px] flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Visit details:
              </CardTitle>
              <CardDescription>
                {format(visit.visit.scheduledDateTime, "HH:mm PPPP")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                <strong>Patient: </strong>
                {`${visit.selectedPatient.person.firstName} ${visit.selectedPatient.person.lastName}`}
              </p>
              <p className="text-sm">
                <strong>Patient National ID: </strong>
                {visit.selectedPatient.person.nationalIDNumber}
              </p>
              <p className="text-sm">
                <strong>Patient Sex: </strong>
                {visit.selectedPatient.person.sex}
              </p>
              <p className="text-sm">
                <strong>Patient Insurance ID: </strong>
                {visit.selectedPatient.insuranceId}
              </p>
              <p className="text-sm">
                <strong>Doctor Name: </strong>
                {`Dr. ${visit.selectedDoctor.clinicStaff.person.firstName} ${visit.selectedDoctor.clinicStaff.person.lastName}`}
              </p>
              <p className="text-sm">
                <strong>Scheduled Date: </strong>
                {format(visit.visit.scheduledDateTime, "PPPP")}
              </p>
              <p className="text-sm">
                <strong>Scheduled Time: </strong>
                {format(visit.visit.scheduledDateTime, "HH:mm")}
              </p>
              <p className="text-sm">
                <strong>Visit Status: </strong>
                {visit.visit.visitStatus}
              </p>
              <div className="text-sm">Comments:</div>
              <div>{visit.visit.description}</div>
            </CardContent>
          </Card>
          <Button className="self-start" asChild>
            <Link
              to={`/doctor/medical-history/${visit.selectedPatient.insuranceId}`}
            >
              Full medical history
            </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>Visit results:</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <Button variant="outline" asChild className="w-1/2 min-w-[286px]">
          <Link to="/doctor">Back</Link>
        </Button>
      </div>
      <div className="w-3/5 h-full flex flex-col gap-4">
        <div className="h-[calc(50%-0.5rem)]">
          <DoctorPhysicalExamination visitId={visit.visit.id} />
        </div>
        <div className="h-[calc(50%-0.5rem)]">
          <DoctorLaboratoryExamination visitId={visit.visit.id} />
        </div>
      </div>
    </div>
  );
};

export { VisitDetails };
