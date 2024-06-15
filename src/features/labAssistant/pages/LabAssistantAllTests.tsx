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
  ScrollArea,
  ScrollBar,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  CardFooter,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const searchTestsSchema = z.object({
  name: z
    .string()
    .max(20, {
      message: "Name must not be longer than 20 characters.",
    })
    .optional(),
  orderDate: z.date().optional(),
});

type SearchTestsValues = z.infer<typeof searchTestsSchema>;

const LabAssistantAllTests: React.FC = () => {
  const navigate = useNavigate();

  const defaultValues: Partial<SearchTestsValues> = {
    name: "",
    orderDate: undefined,
  };
  const form = useForm<SearchTestsValues>({
    resolver: zodResolver(searchTestsSchema),
    defaultValues,
  });

  const onSearchHandler = async (searchTestsValues: SearchTestsValues) => {
    toast.success(`Search initiated`, {
      description: (
        <code className="text-white">
          {JSON.stringify(searchTestsValues, null, 2)}
        </code>
      ),
    });
    console.log(searchTestsValues);
  };

  return (
    <div className="h-full flex justify-between items-start gap-4">
      <div className="h-full min-w-[286px] flex flex-col justify-between">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearchHandler)}>
            <Card>
              <CardHeader>
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor or Patient name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
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
                  name="orderDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of order</FormLabel>
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
                  Search
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <ScrollArea className="w-full h-full">
        <div className="flex flex-col gap-4 min-w-[350px]">
          {"abcdefghijk".split("").map((letter) => (
            <Card key={letter}>
              <CardHeader className="flex-row justify-between items-start gap-4">
                <div className="space-y-1.5">
                  <CardTitle>Blood Test {letter.toUpperCase()}</CardTitle>
                  <CardDescription>For: John Doe</CardDescription>
                  <CardDescription>Ordered: 31.03.2024</CardDescription>
                  <CardDescription>Ordered by: Dr. Jane Smith</CardDescription>
                </div>
                <Button variant="secondary" size="icon">
                  View
                </Button>
              </CardHeader>
              <CardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a lacinia quam, a vehicula nisi. Nulla facilisi. Nunc iaculis dictum mauris, a tempus enim sagittis in. Nam dolor metus, bibendum eu augue eget, maximus euismod neque. Pellentesque vitae ornare enim. Nunc facilisis mi et magna auctor, ut ullamcorper tortor posuere. Donec in vestibulum leo. Ut vel ipsum dictum ante placerat rutrum ut eu massa. Nulla accumsan arcu ac dolor euismod bibendum. Pellentesque sit amet pharetra metus. Phasellus posuere finibus neque, eget tincidunt mi.
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export { LabAssistantAllTests };
