import ReservationForm from "@/components/Reservations/AddReservation";
import ReservationTable from "@/components/Reservations/ReservationTable";
import { toast } from "@/components/ui/use-toast";
import {
  addReservation,
  deleteReservation,
  fetchReservations,
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
    { title: "Diner | Reservations" },
    { name: "description", content: "Add Reservations" },
  ];
};

export const loader: LoaderFunction = async () => {
  const res = await fetchReservations();
  return json({ menu: res });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const _action = formData.get("_action");

  switch (_action) {
    case "additem": {
      const body = Object.fromEntries(formData.entries());
      const { _action, ...newBody } = body;
      const newTableId = parseInt(newBody.table_id as string, 10);
      const reservationTimeValue = newBody.reservation_time;
      const updatedBody = {
        ...newBody,
        table_id: newTableId,
        reservation_time: reservationTimeValue,
      };
      console.log(updatedBody);
      const res = await addReservation(updatedBody);
      return json({ message: res?.message });
    }
    case "deleteitem": {
      const body = Object.fromEntries(formData.entries());
      const { _id } = body;
      const res = await deleteReservation(_id);
      return json({ message: res?.message });
    }

    default:
      return json({ error: "Invalid action" }, { status: 400 });
  }
};

export default function Reservations() {
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
        Reservations
      </h1>
      <div className="flex flex-row justify-around mx-10">
        <ReservationTable />
        <ReservationForm />
      </div>
    </div>
  );
}
