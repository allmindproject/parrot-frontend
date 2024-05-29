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
import { CalendarIcon, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const ReceptionistAllVisits: React.FC = () => {
  const navigate = useNavigate();

  const searchSchema = z.object({
    name: z
      .string()
      .max(20, {
        message: "Name must not be longer than 20 characters.",
      })
      .optional(),
    visitDate: z.date().optional(),
  });

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: { name: "", visitDate: undefined },
  });

  const onSearchHandler = async (data: z.infer<typeof searchSchema>) => {
    //TODO handle searching
    toast.success(`Hehe`, {
      description: (
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      ),
    });
    console.log(data);
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
                          placeholder="Name Surname"
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
                  <CardTitle>Wojciech Dolibóg</CardTitle>
                  <CardDescription>31.03.2024r.</CardDescription>
                  <CardDescription>Dr. John Sm{letter}</CardDescription>
                </div>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                My modernizujemy dużo infrastruktury, remontujemy dużo, ale
                przydałyby się w województwie trzy, cztery nowe szpitale z
                prawdziwego zdarzenia. To jednak koszt 1,5-2 mld zł przy
                kompleksowym podejściu. A mając w Piekarach urazówkę, która jest
                bardzo dobrze zarządzana, ma dodatni wynik finansowy, także
                dzięki staraniom województwa, stworzy ona - myślę - dobrą
                synergię ze szpitalem miejskim - dodał marszałek.
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export { ReceptionistAllVisits };
