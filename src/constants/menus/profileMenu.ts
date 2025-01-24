import { IoSettingsOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { IoCardOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";

interface MenuItem {
  id: number;
  label: string;
  icon: React.ElementType;
  path: string;
}

export const menuItems: MenuItem[] = [
  { id: 1, label: "Personal Information", path: "/user/profile", icon: CiUser },
  { id: 2, label: "My Orders", path: "/user/orders", icon: BsBoxSeam },
  {
    id: 3,
    label: "My Wishlists",
    path: "/user/wishlists",
    icon: IoIosHeartEmpty,
  },
  {
    id: 4,
    label: "Manage Addresses",
    path: "/user/addresses",
    icon: IoLocationOutline,
  },
  {
    id: 5,
    label: "Saved Cards",
    path: "/user/saved-cards",
    icon: IoCardOutline,
  },
  {
    id: 6,
    label: "Notifications",
    path: "/user/notifications",
    icon: IoIosNotificationsOutline,
  },
  { id: 7, label: "Settings", path: "/user/settings", icon: IoSettingsOutline },
];
