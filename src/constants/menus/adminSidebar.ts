import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineInbox } from "react-icons/ai";
import { BsCartDash } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsStar } from "react-icons/bs";
interface AdminMenuItem {
  id: number;
  title: string;
  path: string;
  icon: React.ElementType;
}

export const AdminMenu: AdminMenuItem[] = [
  {
    id: 1,
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: MdOutlineDashboard,
  },
  {
    id: 2,
    title: "Products",
    path: "/admin/products",
    icon: AiOutlineInbox,
  },
  {
    id: 3,
    title: "Orders",
    path: "/admin/orders",
    icon: BsCartDash,
  },
  {
    id: 4,
    title: "Customers",
    path: "/admin/customers",
    icon: HiOutlineUsers,
  },
  {
    id: 5,
    title: "Reviews",
    path: "/admin/reviews",
    icon: BsStar,
  },
];
