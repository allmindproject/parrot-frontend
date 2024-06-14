import { ReceptionistVisits } from "@/components";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  CardFooter,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { useGetVisitsQuery } from "@/services/api/receptionist";
import { VisitSearchRequest } from "@/services/api/receptionist/receptionistApiSlice";
import { handleError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const searchVisitsSchema = z.object({
  patientFirstName: z
    .string()
    .max(20, {
      message: "First name must not be longer than 20 characters.",
    })
    .optional(),
  patientLastName: z
    .string()
    .max(20, {
      message: "Last name must not be longer than 20 characters.",
    })
    .optional(),
  patientInsuranceId: z
    .string()
    .max(20, {
      message: "Insurance ID must not be longer than 20 characters.",
    })
    .optional(),
  doctorFirstName: z
    .string()
    .max(20, {
      message: "First name must not be longer than 20 characters.",
    })
    .optional(),
  doctorLastName: z
    .string()
    .max(20, {
      message: "Last name must not be longer than 20 characters.",
    })
    .optional(),
  doctorNpwzId: z
    .string()
    .max(20, {
      message: "NPWZ ID must not be longer than 20 characters.",
    })
    .optional(),
  visitDate: z.date().optional(),
});

type SearchVisitsValues = z.infer<typeof searchVisitsSchema>;

const ReceptionistAllVisits: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<Partial<VisitSearchRequest>>(
    {}
  );

  const {
    data: visitData = [],
    isLoading: isGetVisitsLoading,
    isError: isGetVisitsError,
    error: visitsError,
    refetch: refetchVisits,
  } = useGetVisitsQuery(searchParams, { refetchOnMountOrArgChange: true });

  const defaultValues: Partial<SearchVisitsValues> = {
    patientFirstName: "",
    patientLastName: "",
    patientInsuranceId: "",
    doctorFirstName: "",
    doctorLastName: "",
    doctorNpwzId: "",
    visitDate: undefined,
  };

  const form = useForm<SearchVisitsValues>({
    resolver: zodResolver(searchVisitsSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSearchHandler = (searchVisitValues: SearchVisitsValues) => {
    setSearchParams({
      patientFirstName: searchVisitValues.patientFirstName || undefined,
      patientLastName: searchVisitValues.patientLastName || undefined,
      patientInsuranceId: searchVisitValues.patientInsuranceId || undefined,
      doctorFirstName: searchVisitValues.doctorFirstName || undefined,
      doctorLastName: searchVisitValues.doctorLastName || undefined,
      doctorNpwzId: searchVisitValues.doctorNpwzId || undefined,
    });
    form.reset();
  };

  useEffect(() => {
    if (isGetVisitsError) {
      handleError(visitsError);
    }
  }, [isGetVisitsError, visitsError]);

  return (
    <div className="h-full flex justify-between items-start gap-4">
      <div className="h-full min-w-[286px] flex flex-col justify-between">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearchHandler)}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Search</CardTitle>
                <CardDescription>
                  Enter the details of the visit below
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="patientFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patientLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patientInsuranceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Insurance ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doctorFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jane"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doctorLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Smith"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doctorNpwzId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor NPWZ ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NPWZ123456"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="visitDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of visit</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto">
                  {isGetVisitsLoading ? "Loading..." : "Search"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <ReceptionistVisits
        visits={visitData}
        isLoading={isGetVisitsLoading}
        refetchVisits={refetchVisits}
      />
    </div>
  );
};

export { ReceptionistAllVisits };
