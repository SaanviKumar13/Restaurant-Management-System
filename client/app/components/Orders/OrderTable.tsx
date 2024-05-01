import { useState } from "react";
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
import { Delete, Filter } from "lucide-react";
import { Input } from "../ui/input";
import { useLoaderData } from "@remix-run/react";

type Item = {
  price: number;
  item_name: string;
  quantity: string;
};

type OrderType = {
  id: number;
  customer_name: string;
  type: string;
  items: Item[];
  total_price: number;
  status: string;
};

function OrderTable() {
  const res = useLoaderData<any>();
  const orders: OrderType[] = res.menu;
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  // Function to apply filters
  const filteredOrders = orders.filter((order: OrderType) => {
    if (filterType && order.type !== filterType) {
      return false;
    }
    if (filterStatus && order.status !== filterStatus) {
      return false;
    }
    return true;
  });

  return (
    <Table className="w-[40vw] mt-10">
      <TableCaption>Diner Orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>
            Type
            <button
              onClick={() => setShowTypeOptions(!showTypeOptions)}
              className="text-purple-300"
            >
              <Filter />
            </button>
            {showTypeOptions && (
              <div className="flex flex-col gap-1 h-fit bg-white border border-gray-200 mt-2 p-2 rounded shadow-md">
                <button
                  onClick={() => {
                    setFilterType(null);
                    setShowTypeOptions(false);
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilterType("dine-in");
                    setShowTypeOptions(false);
                  }}
                >
                  Dine-In
                </button>
                <button
                  onClick={() => {
                    setFilterType("takeaway");
                    setShowTypeOptions(false);
                  }}
                >
                  Takeaway
                </button>
              </div>
            )}
          </TableHead>

          {/* Filter by status */}
          <TableHead>
            Status
            <button
              onClick={() => setShowStatusOptions(!showStatusOptions)}
              className="text-purple-300"
            >
              <Filter />
            </button>
            {showStatusOptions && (
              <div className="flex flex-col gap-1 h-fit bg-white border border-gray-200 mt-2 p-2 rounded shadow-md">
                <button
                  onClick={() => {
                    setFilterStatus(null);
                    setShowStatusOptions(false);
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilterStatus("pending");
                    setShowStatusOptions(false);
                  }}
                >
                  Pending
                </button>
                <button
                  onClick={() => {
                    setFilterStatus("completed");
                    setShowStatusOptions(false);
                  }}
                >
                  Completed
                </button>
                <button
                  onClick={() => {
                    setFilterStatus("cancelled");
                    setShowStatusOptions(false);
                  }}
                >
                  Cancelled
                </button>
              </div>
            )}
          </TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredOrders.map((order: OrderType) => (
          <TableRow key={order.id}>
            <TableCell>{order.customer_name}</TableCell>
            <TableCell>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.quantity}</li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.item_name} - ₹ {item.price}
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>₹ {order.total_price}</TableCell>
            <TableCell>{order.type}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>
              <form action="/orders" method="post">
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
                    value={order.id}
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
  );
}

export default OrderTable;
