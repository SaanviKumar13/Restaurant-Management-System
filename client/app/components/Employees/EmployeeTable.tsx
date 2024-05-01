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
import { formatDate } from "date-fns";

type EmployeeType = {
  employee_id: number;
  employee_name: string;
  employee_role: string;
  address: string;
  gender: string;
  phone_number: string;
  dob: string;
  salary: number;
};

function EmployeeTable() {
  const itemsRes = useLoaderData<any>();
  const items = itemsRes.menu;

  return (
    <div>
      <Table className="w-[40vw] mt-10">
        <TableCaption>Diner Employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="flex flex-row gap-3">Gender</TableHead>
            <TableHead className="text-right">Salary</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead className="flex flex-row gap-3">Address</TableHead>
            <TableHead className="text-right">Phone Number</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: EmployeeType) => (
            <TableRow key={item.employee_id}>
              <TableCell className="font-medium">
                {item.employee_name}
              </TableCell>
              <TableCell>{item.employee_role}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.salary}</TableCell>
              <TableCell className="text-right">
                {formatDate(item.dob, "PPP")}
              </TableCell>
              <TableCell className="text-right">{item.address}</TableCell>
              <TableCell className="text-right">{item.phone_number}</TableCell>
              <TableCell>
                <form action="/employees" method="post">
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
                      value={item.employee_id}
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

export default EmployeeTable;
