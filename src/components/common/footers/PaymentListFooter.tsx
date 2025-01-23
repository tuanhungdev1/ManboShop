import { Link } from "react-router-dom";
import { PiTruck } from "react-icons/pi";
import { SiVisa } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa";

const PaymentListFooter = () => {
  return (
    <div className="mt-8">
      <span className="uppercase text-[14px] font-medium cursor-pointer">
        Thanh toán
      </span>
      <ul className="text-[12px] mt-4 flex gap-1 ">
        <Link to={"/"}>
          <li className="flex items-center bg-primary-800 w-[100px] justify-center h-[40px] gap-1 rounded-md text-[14px] font-medium text-white">
            <PiTruck className="text-[20px] -mt-[2px]" />
            <span>COD</span>
          </li>
        </Link>

        <Link to={"/"}>
          <li className="flex items-center bg-primary-800 w-[100px] justify-center h-[40px] gap-1 rounded-md text-[14px] font-medium text-white">
            <SiVisa className="text-[50px]" />
          </li>
        </Link>

        <Link to={"/"}>
          <li className="flex items-center bg-primary-800 w-[100px] justify-center h-[40px] gap-1 rounded-md text-[14px] font-medium text-white">
            <FaCcMastercard className="text-[30px]" />
          </li>
        </Link>

        <Link to={"/"}>
          <li className="flex items-center bg-primary-800 w-[100px] justify-center h-[40px] gap-1 rounded-md text-[12px] font-medium text-white">
            <span>E-WALLET</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default PaymentListFooter;
