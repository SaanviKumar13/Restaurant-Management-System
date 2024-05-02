import InventoryForm from "@/components/Inventory/InventoryForm";
import InventoryTable from "@/components/Inventory/InventoryTable";
import MenuForm from "@/components/Menu/EditMenu";
import MenuTable from "@/components/Menu/MenuTable";
import { toast } from "@/components/ui/use-toast";
import {
  addInventory,
  addMenuItem,
  deleteInventory,
  deleteMenuItem,
  fetchInventory,
  fetchMenu,
} from "@/utils/api.server";
import {
  ActionFunction,
  LoaderFunction,
  json,
  type MetaFunction,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";

type ActionData = {
  message?: string;
  error?: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Diner | Inventory" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const res = await fetchInventory();
  return json({ menu: res });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const _action = formData.get("_action");
  switch (_action) {
    case "additem": {
      const body = Object.fromEntries(formData.entries());
      const { _action, ...newBody } = body;
      const transformedBody = {
        ...newBody,
        unit_price: Number(newBody.unit_price),
      };
      const res = await addInventory(transformedBody);
      return json({ message: res?.message });
    }
    case "deleteitem": {
      const body = Object.fromEntries(formData.entries());
      const { _id } = body;
      const res = await deleteInventory(_id);
      return json({ message: res?.message });
    }

    default:
      return json({ error: "Invalid action" }, { status: 400 });
  }
};

export default function Inventory() {
  const actionData = useActionData<ActionData>();
  useEffect(() => {
    if (actionData?.message) {
      toast({ title: actionData.message });
    }

    if (actionData?.error) {
      toast({
        title: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData]);
  return (
    <div className="font-sans bg-[#1d212c] w-screen p-10">
      <h1 className="text-4xl mb-6 text-purple-200 font-heading w-[60vw] text-center font-bold">
        Inventory
      </h1>
      <div className="flex flex-row justify-around mx-10">
        <InventoryTable />
        <InventoryForm />
      </div>
    </div>
  );
}
