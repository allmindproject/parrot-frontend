import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useSearchExaminationsQuery } from "@/services/api/doctor/doctorApiSlice";
//TODO bo nie dziala poki co
const Examinations: React.FC = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useSearchExaminationsQuery({ code: "", description: "" });
  let content: JSX.Element;
  if (isLoading) {
    content = <div>Loading examinations...</div>;
  } else if (isSuccess) {
    content = (
      <div className="grid gap-4">
        {data.map((examination, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{examination.code}</CardTitle>
              <CardDescription>{examination.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{examination.type}</p>
            </CardContent>
            <CardFooter>
              <p>{examination.rightsLevel}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  } else content = <p>dupa</p>;

  return content;
};
export { Examinations };
