import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";

interface ActionIcon {
  id: number;
  title: string;
  icon: React.ElementType;
  path: string;
}

export const actionIcons: ActionIcon[] = [
  { id: 1, title: "Tìm Kiếm", icon: CiSearch, path: "/search" },
  { id: 2, title: "Người Dùng", icon: CiUser, path: "/user" },
  { id: 3, title: "Yêu Thích", icon: CiHeart, path: "/favorites" },
  { id: 4, title: "Giỏ Hàng", icon: HiOutlineShoppingBag, path: "/cart" },
];
