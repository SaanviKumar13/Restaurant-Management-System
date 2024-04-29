import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Diner" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <div className="font-sans bg-[#1d212c] w-screen">Home page</div>;
}
