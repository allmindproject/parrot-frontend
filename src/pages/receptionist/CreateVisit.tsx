import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const createVisitSchema = z.object({
  patientName: z
    .string({
      required_error: "Patient name is required.",
    })
    .min(2, {
      message: "Patient name must be at least 2 characters.",
    })
    .max(30, {
      message: "Patient name must not be longer than 30 characters.",
    }),
  patientSurname: z
    .string({
      required_error: "Patient surname is required.",
    })
    .min(2, {
      message: "Patient surname must be at least 2 characters.",
    })
    .max(30, {
      message: "Patient surname must not be longer than 30 characters.",
    }),
  visitDate: z.date({
    required_error: "Date of visit is required.",
  }),
  doctorName: z
    .string({
      required_error: "Doctor name is required.",
    })
    .min(2, {
      message: "Doctor name must be at least 2 characters.",
    })
    .max(30, {
      message: "Doctor name must not be longer than 30 characters.",
    }),
  doctorSurname: z
    .string({
      required_error: "Doctor surname is required.",
    })
    .min(2, {
      message: "Doctor surname must be at least 2 characters.",
    })
    .max(30, {
      message: "Doctor surname must not be longer than 30 characters.",
    }),
  comments: z
    .string()
    .max(500, {
      message: "Comments must not be longer than 500 characters.",
    })
    .optional(),
});

type CreateVisitValues = z.infer<typeof createVisitSchema>;

const CreateVisit: React.FC = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const defaultValues: Partial<CreateVisitValues> = {
    patientName: "",
    patientSurname: "",
    visitDate: undefined,
    doctorName: "",
    doctorSurname: "",
    comments: "",
  };

  const form = useForm<CreateVisitValues>({
    resolver: zodResolver(createVisitSchema),
    defaultValues,
    mode: "onChange",
  });

  const onCreateVisitHandler = async (visitValues: CreateVisitValues) => {
    console.log(visitValues);
    try {
      //   const authResult = await login(loginValues).unwrap();
      // dispatch(setCredentials({token: authResult.access_token}));
      // navigate("/dashboard");
    } catch (err) {
      //TODO okreslic typ erroru
      console.log("z CreateVisit ", err);
      // toast.error(`Error ${err.data.status}`, {
      //   description: `${err.data.message}`,
      // });
    }
  };

  const onCancelHandler = () => {
    navigate("/receptionist");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateVisitHandler)}>
        <Card className="min-w-[500px] max-w-[700px] m-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Create New Visit
            </CardTitle>
            <CardDescription>
              Enter the details of the visit below
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Patient name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patientSurname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Patient surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Doctor name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dr. Smith"
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
                name="doctorSurname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Doctor surname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brown"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any comments here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex gap-4 justify-end">
            <Button variant="secondary" onClick={onCancelHandler} type="button">
              Cancel
            </Button>
            <Button type="submit">Create Visit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export { CreateVisit };
