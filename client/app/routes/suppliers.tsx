import MenuTable from "@/components/MenuTable";
import { fetchMenu, fetchSuppliers } from "@/utils/api.server";
import { LoaderFunction, json, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Diner | Menu" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const res = await fetchSuppliers();
  return json({ menu: res });
};

export default function Menu() {
  return (
    <div className="font-sans bg-[#eff0f2] w-screen">
      <MenuTable />
    </div>
  );
}
