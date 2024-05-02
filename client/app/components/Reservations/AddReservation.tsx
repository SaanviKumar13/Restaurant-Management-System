import { cn } from "@/lib/styles";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";

type ReservationItem = {
  reservation_id: number;
  customer_name: string;
  reservation_date: string;
  reservation_time: string;
  table_id: number;
};

const ReservationForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="w-[20vw] mt-10 h-fit py-4 bg-[#141720] rounded-md text-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl lg:text-2xl">Add New Reservation</h1>
        <div>
          <form
            action={"/reservations"}
            method="post"
            className="flex flex-col items-center gap-5"
          >
            <Input
              type="text"
              placeholder="Customer Name"
              name="customer_name"
              className="m-2 w-48"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-48 justify-start bg-[#141720] text-left font-normal",
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
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input
              type="hidden"
              value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
              name="reservation_date"
            />
            <Input
              type="text"
              placeholder="Number of People"
              name="number_of_people"
              className="m-2 w-48"
            />
            <Input
              type="text"
              placeholder="Time"
              name="reservation_time"
              className="m-2 w-48"
            />

            <Input
              type="number"
              placeholder="Table Number"
              name="table_id"
              className="m-2 w-48"
            />
            <Button
              name="_action"
              type="submit"
              value="additem"
              className="bg-purple-100 ml-2"
            >
              Add Reservation
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
