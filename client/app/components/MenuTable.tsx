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
    <Table className="text-black w-[60vw] mx-auto mt-10">
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MenuTable;
