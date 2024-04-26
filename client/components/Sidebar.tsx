import {
  AreaChart,
  BookOpenText,
  Clock2,
  Home,
  IndianRupee,
  NotebookPen,
  Rows4,
  UserCog,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/router";

const links = [
  { name: "Home", href: "/", logo: <Home className="text-purple-200" /> },
  {
    name: "Menu",
    href: "/menu",
    logo: <BookOpenText className="text-purple-200" />,
  },
  {
    name: "Reservations",
    href: "/reservations",
    logo: <Clock2 className="text-purple-200" />,
  },
  {
    name: "Orders",
    href: "/orders",
    logo: <NotebookPen className="text-purple-200" />,
  },
  {
    name: "Inventory",
    href: "/inventory",
    logo: <Rows4 className="text-purple-200" />,
  },
  {
    name: "Employees",
    href: "/employees",
    logo: <UsersRound className="text-purple-200" />,
  },
  {
    name: "Suppliers",
    href: "/suppliers",
    logo: <UserCog className="text-purple-200" />,
  },
  {
    name: "Transactions",
    href: "/transactions",
    logo: <IndianRupee className="text-purple-200" />,
  },
  {
    name: "Insights",
    href: "/insights",
    logo: <AreaChart className="text-purple-200" />,
  },
];

const Sidebar = () => {
  const router = useRouter();

  // Define a function to determine if a link is active
  const isActive = (href: string) => {
    return router.pathname === href;
  };

  return (
    <div className="bg-[#141720] min-h-screen h-full text-white w-64 flex-none flex flex-col justify-between">
      <div className="p-4 min-h-screen h-full flex flex-col justify-start gap-20">
        <div className="flex flex-row items-center justify-start gap-5">
          <img src="/logo.png" alt="logo" width={32} height={32} />
          <h2 className="text-3xl font-bold from-purple-400 via-purple-300 to-purple-100 bg-gradient-to-b bg-clip-text text-transparent">
            DINER
          </h2>
        </div>
        <div>
          <ul>
            {links.map((link, index) => (
              <li key={index} className="mb-5">
                <a
                  href={link.href}
                  className={`flex flex-row gap-3 hover:text-gray-300 p-2 rounded-lg ${
                    isActive(link.href)
                      ? "bg-[#1d212c] py-4 px-3 text-white"
                      : ""
                  }`}
                >
                  {link.logo}
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
