import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";
import { Input } from "../ui/input";
import { useLoaderData } from "@remix-run/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/styles";
import { format } from "date-fns";

type ReservationItem = {
  reservation_id: number;
  customer_name: string;
  reservation_date: string;
  reservation_time: string;
  table_id: number;
};

function ReservationTable() {
  const itemsRes = useLoaderData<any>();
  const items = itemsRes.menu;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minute < 10 ? "0" + minute : minute} ${ampm}`;
  };

  const [selectedDate, setSelectedDate] = useState<Date>();

  const filteredItems = !selectedDate
    ? items
    : items.filter(
        (item: ReservationItem) =>
          new Date(item.reservation_date).toLocaleDateString() ===
          selectedDate.toLocaleDateString()
      );

  return (
    <div>
      <Table className="w-[40vw] mt-10">
        <TableCaption>Reservations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Customer Name</TableHead>
            <TableHead className="pb-6">Time</TableHead>
            <TableHead className="flex flex-row gap-3">
              Date
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate && format(selectedDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </TableHead>
            <TableHead className="text-right">Table Number</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item: ReservationItem) => (
            <TableRow key={item.reservation_id}>
              <TableCell className="font-medium">
                {item.customer_name}
              </TableCell>
              <TableCell>{formatTime(item.reservation_time)}</TableCell>
              <TableCell>{formatDate(item.reservation_date)}</TableCell>
              <TableCell className="text-right">{item.table_id}</TableCell>
              <TableCell>
                <form action="/reservations" method="post">
                  <Button
                    name="_action"
                    type="submit"
                    value="deleteitem"
                    className="text-purple-500 ml-2"
                  >
                    <Delete />
                    <Input
                      type="_id"
                      name="_id"
                      value={item.reservation_id}
                      className="m-2 w-48 hidden"
                      readOnly
                    />
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ReservationTable;
