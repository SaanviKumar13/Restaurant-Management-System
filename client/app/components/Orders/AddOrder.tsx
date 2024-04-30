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

const OrderForm = () => {
  const [items, setItems] = useState([
    { price: 0, item_name: "", quantity: "" },
  ]);

  const handleAddItem = () => {
    setItems([...items, { price: 0, item_name: "", quantity: "" }]);
  };

  return (
    <div className="w-[30vw] mt-10 h-fit py-4 bg-[#141720] rounded-md text-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl lg:text-2xl">Add New Order</h1>
        <div>
          <form
            action={"/orders"}
            method="post"
            className="flex flex-col items-center gap-5"
          >
            <Input
              type="text"
              placeholder="Customer Name"
              name="customer_name"
              className="m-2 w-48"
            />

            <Input
              type="text"
              placeholder="Total Amount"
              name="total_price"
              className="m-2 w-48"
            />
            {items.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Input
                  type="text"
                  placeholder="Item Name"
                  name={`item_name_${index}`}
                  className="m-2 w-48"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  name={`price_${index}`}
                  className="m-2 w-48"
                />
                <Input
                  type="text"
                  placeholder="Quantity"
                  name={`quantity_${index}`}
                  className="m-2 w-48"
                />
              </div>
            ))}

            <Input
              type="text"
              placeholder="Status"
              name="status"
              className="m-2 w-48"
            />
            <Button
              type="button"
              onClick={handleAddItem}
              className="bg-purple-100 ml-2"
            >
              Add Item
            </Button>
            <Button
              name="_action"
              type="submit"
              value="additem"
              className="bg-purple-100 ml-2"
            >
              Add Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
