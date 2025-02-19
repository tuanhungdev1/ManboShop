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
  { id: 1, label: "Thông Tin Cá Nhân", path: "/user/profile", icon: CiUser },
  { id: 2, label: "Đơn Hàng Của Tôi", path: "/user/orders", icon: BsBoxSeam },
  {
    id: 3,
    label: "Danh Sách Yêu Thích",
    path: "/user/wishlists",
    icon: IoIosHeartEmpty,
  },
  {
    id: 4,
    label: "Quản Lý Địa Chỉ",
    path: "/user/addresses",
    icon: IoLocationOutline,
  },
  {
    id: 5,
    label: "Thẻ Đã Lưu",
    path: "/user/saved-cards",
    icon: IoCardOutline,
  },
  {
    id: 6,
    label: "Thông Báo",
    path: "/user/notifications",
    icon: IoIosNotificationsOutline,
  },
  { id: 7, label: "Cài Đặt", path: "/user/settings", icon: IoSettingsOutline },
];
