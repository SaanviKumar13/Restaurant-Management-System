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

type Item = {
  price: number;
  item_name: string;
  quantity: string;
};

type OrderType = {
  id: number;
  customer_name: string;
  items: Item[];
  total_price: number;
  status: string;
};

function OrderTable() {
  const res = useLoaderData<any>();
  const orders = res.menu;

  return (
    <div>
      {/* Table displaying orders */}
      <Table className="w-[40vw] mt-10">
        <TableCaption>Diner Orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order: OrderType) => (
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
    </div>
  );
}

export default OrderTable;
