import { Card } from "@/components/Card";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Restaurant Management System" },
    {
      name: "description",
      content: "Welcome to the Restaurant Management System for admins",
    },
  ];
};

const features = [
  {
    id: 1,
    name: "Insights",
    description: "Provides Insights from customer orders to boost sales.",
    href: "/insights",
  },
  {
    id: 2,
    name: "Menu Customization",
    description:
      "Customize menus with ease, including adding, removing, and updating items.",
    href: "/menu",
  },
  {
    id: 3,
    name: "Order Management",
    description:
      "Streamline order taking and processing for both dine-in and takeout orders.",
    href: "/orders",
  },
  {
    id: 4,
    name: "Inventory Tracking",
    description:
      "Track inventory levels and receive alerts for low stock items.",
    href: "/inventory",
  },
  {
    id: 5,
    name: "Staff Management",
    description: "Manage employee schedules, roles, and performance.",
    href: "/employees",
  },
];

export default function AdminHomePage() {
  return (
    <div className="bg-[url('bg.svg')] bg-cover bg-no-repeat w-screen text-white flex flex-col justify-center items-center min-h-screen h-full p-10 font-sans">
      <h1 className="text-6xl mb-6 font-heading w-[60vw] text-center text-purple-200 font-semibold">
        Diner
        <br /> A Restaurant Management System
      </h1>

      <div className="w-[70vw] flex flex-row flex-wrap justify-center gap-8 mt-10">
        {features.map((feature) => (
          <Link key={feature.id} to={feature.href}>
            <Card {...feature} />
          </Link>
        ))}
      </div>
    </div>
  );
}
