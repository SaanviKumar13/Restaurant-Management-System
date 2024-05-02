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
import EditableText from "../EditableText";

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
  const [selectedMealType, setSelectedMealType] = useState("All"); // State for selected meal type
  const [showOptions, setShowOptions] = useState(false); // State for displaying options

  // Function to toggle display of options
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const filteredItems =
    selectedMealType === "All"
      ? items
      : items.filter((item: MenuItem) => item.meal_type === selectedMealType);

  return (
    <div>
      {/* Table displaying filtered items */}
      <Table className="w-[40vw] mt-10">
        <TableCaption>Diner Menu.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="flex flex-row gap-3">
              Meal Type
              <button onClick={toggleOptions} className="text-purple-300">
                <Filter />
              </button>
              {showOptions && (
                <div className="flex flex-col gap-1 h-fit bg-white border border-gray-200 mt-2 p-2 rounded shadow-md">
                  <button
                    onClick={() => {
                      setSelectedMealType("All");
                      toggleOptions();
                    }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMealType("Breakfast");
                      toggleOptions();
                    }}
                  >
                    Breakfast
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMealType("Lunch");
                      toggleOptions();
                    }}
                  >
                    Lunch
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMealType("Dinner");
                      toggleOptions();
                    }}
                  >
                    Dinner
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMealType("Dessert");
                      toggleOptions();
                    }}
                  >
                    Dessert
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMealType("Drinks");
                      toggleOptions();
                    }}
                  >
                    Drinks
                  </button>
                </div>
              )}
            </TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item: MenuItem) => (
            <TableRow key={item.menu_id}>
              <TableCell className="font-medium">
                <EditableText
                  initialText={item.item_name}
                  action="/menu"
                  name="item_name"
                  _id={item.menu_id}
                />
              </TableCell>
              <TableCell>
                <EditableText
                  initialText={item.description}
                  action="/menu"
                  name="description"
                  _id={item.menu_id}
                />
              </TableCell>
              <TableCell className="w-32">
                <EditableText
                  initialText={item.meal_type}
                  action="/menu"
                  name="meal_type"
                  _id={item.menu_id}
                />
              </TableCell>
              <TableCell className="text-right">
                <EditableText
                  initialText={item.price}
                  action="/menu"
                  name="price"
                  _id={item.menu_id}
                />
              </TableCell>
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
    </div>
  );
}

export default MenuTable;
