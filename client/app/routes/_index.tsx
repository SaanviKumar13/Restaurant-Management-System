import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Restaurant Management System" },
    {
      name: "description",
      content: "Welcome to the Restaurant Management System for admins",
    },
  ];
};

export default function AdminHomePage() {
  return (
    <div className="bg-[#1d212c] w-screen text-white flex flex-col justify-center items-center h-screen font-sans">
      <h1 className="text-4xl mb-6">
        Welcome to the Restaurant Management System
      </h1>
      <p className="text-lg text-center max-w-md mb-10">
        Manage your restaurant efficiently with our powerful tools and features.
      </p>
      <h1 className="text-purple-400 font-bold text-6xl m-2 text-left mb-3">
        Our Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-950">
        <div className="p-6 w-96 bg-purple-50 rounded-lg">
          <h2 className="text-2xl mb-4">Orders Management</h2>
          <p>View, process, and manage incoming orders with ease.</p>
        </div>
        <div className="p-6 w-96 bg-purple-50 rounded-lg">
          <h2 className="text-2xl mb-4">Menu Management</h2>
          <p>
            Add, edit, and remove menu items effortlessly to keep your menu
            up-to-date.
          </p>
        </div>
        <div className="p-6 w-96 bg-purple-50 rounded-lg">
          <h2 className="text-2xl mb-4">Inventory Management</h2>
          <p>Track and manage your restaurant's inventory in real-time.</p>
        </div>
        <div className="p-6 w-96 bg-purple-50 rounded-lg">
          <h2 className="text-2xl mb-4">Staff Management</h2>
          <p>Manage staff schedules, roles, and payroll efficiently.</p>
        </div>
      </div>
      <div className="p-6 w-96 bg-purple-50 rounded-lg">
        <h2 className="text-2xl mb-4">Insights</h2>
        <p>
          Provides insigts on the menu items and customers to increase sales.
        </p>
      </div>
    </div>
  );
}
