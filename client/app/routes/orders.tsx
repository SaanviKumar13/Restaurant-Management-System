import OrderForm from "@/components/Orders/AddOrder";
import OrderTable from "@/components/Orders/OrderTable";
import { toast } from "@/components/ui/use-toast";
import {
  addOrder,
  deleteOrder,
  fetchOrders,
  updateOrder,
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
    { title: "Diner | Orders" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const res = await fetchOrders();
  return json({ menu: res });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const _action = formData.get("_action");

  switch (_action) {
    case "additem": {
      const body = Object.fromEntries(formData.entries());
      const { customer_name, total_price, status, ...rest } = body;

      // Filter out keys related to items
      const itemKeys = Object.keys(rest).filter((key) =>
        key.startsWith("item_name")
      );

      // Get the number of items
      const itemCount = itemKeys.length;

      // Map each item to match the expected format and push into an array
      const transformedItems = [...Array(itemCount)].map((_, index) => ({
        item_name: body[`item_name_${index}`],
        price: Number(body[`price_${index}`]),
        quantity: Number(body[`quantity_${index}`]),
      }));

      // Merge transformed items array with the rest of the data
      const transformedBody = {
        customer_name: customer_name,
        total_price: Number(total_price),
        status: status,
        items: transformedItems, // Assuming transformedItems is already correctly defined
      };

      console.log(transformedBody);

      const res = await addOrder(transformedBody);
      return json({ message: res?.message });
    }

    case "deleteitem": {
      const body = Object.fromEntries(formData.entries());
      const { _id } = body;
      const res = await deleteOrder(_id);
      return json({ message: res?.message });
    }
    case "markcomplete": {
      const body = Object.fromEntries(formData.entries());
      const { _id } = body;
      const status = { status: "completed" };
      const res = await updateOrder(_id, status);
      return json({ message: res?.message });
    }

    default:
      return json({ error: "Invalid action" }, { status: 400 });
  }
};

export default function Orders() {
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
        Orders
      </h1>
      <div className="flex flex-row justify-around mx-10">
        <OrderTable />
        <OrderForm />
      </div>
    </div>
  );
}
