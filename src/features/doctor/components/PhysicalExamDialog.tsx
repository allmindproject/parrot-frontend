import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@/components/ui";
import {
  useAddPhysicalExaminationMutation,
  useGetExaminationsQuery,
} from "@/features/doctor/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "@/utils";
import { useEffect } from "react";
import { PhysicalExaminationAddRequest } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";

const createPhysicalExaminationSchema = z.object({
  examinationDictCode: z.string({
    required_error: "Examination is required.",
  }),
  result: z
    .string({
      required_error: "Result is required.",
    })
    .max(255, {
      message: "Result must not be longer than 255 characters.",
    }),
});
type CreatePhExamValues = z.infer<typeof createPhysicalExaminationSchema>;

type PhysicalExamDialogProps = {
  setOpen: (open: boolean) => void;
  visitId: number;
};

const PhysicalExamDialog: React.FC<PhysicalExamDialogProps> = ({
  setOpen,
  visitId,
}) => {
  const [addExamination, { isSuccess: isAddExaminationSuccess }] =
    useAddPhysicalExaminationMutation();

  const {
    data: examinations = [],
    isError: isExaminationsError,
    error: examinationsError,
  } = useGetExaminationsQuery({});

  const defaultValues: Partial<CreatePhExamValues> = {
    examinationDictCode: undefined,
    result: undefined,
  };

  const form = useForm<CreatePhExamValues>({
    resolver: zodResolver(createPhysicalExaminationSchema),
    defaultValues,
    mode: "onChange",
  });

  const onAddHandler = async (exam: CreatePhExamValues) => {
    const examAddRequest: PhysicalExaminationAddRequest = {
      examinationDictCode: exam.examinationDictCode,
      result: exam.result,
      visitId: visitId,
      examinationDateTime: format(new Date(), "HH:mm dd.MM.yyyy"),
    };

    console.log(examAddRequest);

    try {
      const asd = await addExamination(examAddRequest).unwrap();
      console.log(asd); //TODOD DELETE
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (isAddExaminationSuccess) {
      form.reset();
      setOpen(false);
      toast.success(`Physical examination added successfully`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddExaminationSuccess]);

  useEffect(() => {
    if (isExaminationsError) {
      handleError(examinationsError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExaminationsError]);

  const physicalExaminations = examinations.filter(
    (examination) => examination.type === "PHYSICAL"
  );

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add physical examination</DialogTitle>
        <DialogDescription>
          Enter the details of the examination below.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAddHandler)}>
          <FormField
            control={form.control}
            name="examinationDictCode"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Examination</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? physicalExaminations.find(
                              (e) => e.code === field.value
                            )?.description
                          : "Select examination"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="min-w-[300px] w-auto p-0"
                    align="start"
                  >
                    <Command className="rounded-lg border shadow-md">
                      <CommandInput placeholder="Search examination..." />
                      <CommandList>
                        <CommandEmpty>No examinations found.</CommandEmpty>
                        <CommandGroup>
                          {physicalExaminations.map((examination) => (
                            <CommandItem
                              key={examination.code}
                              value={examination.description}
                              onSelect={() => {
                                form.setValue(
                                  "examinationDictCode",
                                  examination.code
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === examination.code
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <span className="mr-2">
                                {examination.description}
                              </span>
                              <span className="ml-auto">
                                {examination.code}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="result"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Result</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter result here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="sm:justify-end mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Add examination</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export { PhysicalExamDialog };
