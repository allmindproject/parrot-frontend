import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
} from "@/components/ui";
import { useState } from "react";

const ReceptionistDashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="h-full flex justify-between items-start gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="border rounded-md"
      />
      <div className="w-full h-full flex flex-col items-stretch gap-4">
        <div className="flex justify-end gap-4">
          <Button variant="default">Create new visit</Button>
          <Button variant="outline">See all visits</Button>
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-4">
            {"abcdefghijk".split("").map((letter) => (
              <Card key={letter}>
                <CardHeader className="flex-row justify-between items-start gap-4">
                  <div>
                    <CardTitle>Wojciech Dolibóg</CardTitle>
                    <CardDescription>{letter}e szpitale z pr</CardDescription>
                  </div>
                  <Button>Enter a visit</Button>
                </CardHeader>
                <CardContent>
                  My modernizujemy dużo infrastruktury, remontujemy dużo, ale
                  przydałyby się w województwie trzy, cztery nowe szpitale z
                  prawdziwego zdarzenia. To jednak koszt 1,5-2 mld zł przy
                  kompleksowym podejściu. A mając w Piekarach urazówkę, która
                  jest bardzo dobrze zarządzana, ma dodatni wynik finansowy,
                  także dzięki staraniom województwa, stworzy ona - myślę -
                  dobrą synergię ze szpitalem miejskim - dodał marszałek.
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export { ReceptionistDashboard };
