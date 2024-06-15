import React from 'react';
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
import { useNavigate } from "react-router-dom";

const LabSupervisorDashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  return (
    <div className="h-full flex justify-between items-start gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="border rounded-md p-4"
      />
      <div className="w-full h-full flex flex-col items-stretch gap-4">
        <div className="flex justify-end gap-4">
          <Button variant="default" onClick={() => navigate("all-tests")}>See all tests</Button>
        </div>
        <ScrollArea className="w-full h-full">
          <div className="flex flex-col gap-4 min-w-[350px]">
            {"abcdefghijk".split("").map((letter) => (
              <Card key={letter}>
                <CardHeader className="flex-row justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <CardTitle>Test {letter}</CardTitle>
                    <CardDescription>Ordered: 31.03.2024</CardDescription>
                    <CardDescription>Ordered by: Dr. John Sm{letter}</CardDescription>
                  </div>
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
    </div>
  );
};

export { LabSupervisorDashboard };
