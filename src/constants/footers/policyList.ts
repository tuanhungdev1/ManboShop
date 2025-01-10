import { PiCoffeeLight } from "react-icons/pi";
import { PiTruckLight } from "react-icons/pi";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { PiShieldCheck } from "react-icons/pi";
export interface PolicyItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

export const policyList: PolicyItem[] = [
  {
    id: 1,
    title: "Free trà và cafe",
    description: "Tại showroom",
    icon: PiCoffeeLight,
  },
  {
    id: 2,
    title: "Giao hàng",
    description: "Free ship đơn >800k",
    icon: PiTruckLight,
  },
  {
    id: 3,
    title: "Thanh toán",
    description: "Bảo Mật an toàn",
    icon: PiContactlessPaymentLight,
  },
  {
    id: 4,
    title: "Bảo hành",
    description: "Lên đến 180 ngày",
    icon: PiShieldCheck,
  },
];
