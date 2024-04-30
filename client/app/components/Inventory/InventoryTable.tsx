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
import { Delete, Filter } from "lucide-react";
import { Input } from "../ui/input";
import { useLoaderData } from "@remix-run/react";

type InventoryType = {
  inventory_id: number;
  name: string;
  unit_price: number;
  category: string;
  supplier_id: number;
  unit: string;
  payment_id: number;
  delivery_time: string;
};

function InventoryTable() {
  const itemsRes = useLoaderData<any>();
  const items = itemsRes.menu;

  return (
    <div>
      <Table className="w-[40vw] mt-10">
        <TableCaption>Diner Inventory.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="flex flex-row gap-3">Unit Price</TableHead>
            <TableHead className="text-right">Category</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: InventoryType) => (
            <TableRow key={item.inventory_id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.unit_price}</TableCell>
              <TableCell className="text-right">{item.unit}</TableCell>
              <TableCell>
                <form action="/inventory" method="post">
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
                      value={item.inventory_id}
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

export default InventoryTable;
