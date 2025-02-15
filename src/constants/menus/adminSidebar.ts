import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineInbox } from "react-icons/ai";
import { BsCartDash } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsStar } from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
interface AdminMenuItem {
  id: number;
  title: string;
  path: string;
  icon: React.ElementType;
}

export const AdminMenu: AdminMenuItem[] = [
  {
    id: 1,
    title: "Bảng điều khiển",
    path: "/admin/dashboard",
    icon: MdOutlineDashboard,
  },
  {
    id: 2,
    title: "Sản phẩm",
    path: "/admin/products",
    icon: AiOutlineInbox,
  },
  {
    id: 3,
    title: "Đơn hàng",
    path: "/admin/orders",
    icon: BsCartDash,
  },
  {
    id: 4,
    title: "Khách hàng",
    path: "/admin/customers",
    icon: HiOutlineUsers,
  },
  {
    id: 5,
    title: "Đánh giá",
    path: "/admin/reviews",
    icon: BsStar,
  },
  {
    id: 6,
    title: "Mã giảm giá",
    path: "/admin/coupons",
    icon: RiCoupon3Line,
  },
  {
    id: 7,
    title: "Bài viết",
    path: "/admin/posts",
    icon: IoDocumentTextOutline,
  },
];
