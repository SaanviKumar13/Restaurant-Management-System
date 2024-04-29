import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoaderData } from "@remix-run/react";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";
import { Input } from "../ui/input";
type MenuItem = {
  menu_id: number;
  description: string;
  meal_type: string;
  item_name: string;
  price: number;
};

function MenuTable() {
  const itemsRes = useLoaderData<any>();
  const items = itemsRes.menu;
  return (
    <Table className="w-[40vw] mt-10">
      <TableCaption>Diner Menu.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Meal Type</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item: MenuItem) => (
          <TableRow key={item.menu_id}>
            <TableCell className="font-medium">{item.item_name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.meal_type}</TableCell>
            <TableCell className="text-right">{item.price}</TableCell>
            <TableCell>
              <form action="/menu" method="post">
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
                    value={item.menu_id}
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

export default MenuTable;
