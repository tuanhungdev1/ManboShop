import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdDeleteOutline } from "react-icons/md";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    size: string;
    imageUrl: string;
  };
  onRemove: (id: string) => void; // Function to handle item removal
}

const CartItem = () => {
  return (
    <div className="flex py-8 border-b relative items-stretch">
      <div className="flex items-center flex-1">
        <img
          src={
            "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1733507121/798115_XJG54_3217_001_100_0000_Light-Embroidered-cotton-jersey-T-shirt.jpg"
          }
          alt={"name"}
          style={{ width: 100, height: 100, marginRight: 16 }}
        />
        <div className="flex flex-col gap-2">
          <span className="font-medium text-sm">
            Embroidered Cotton Jersey T-Shirt
          </span>
          <div className="text-[16px] font-bold">
            {`1`} x ${780}
          </div>
          <span className="font-medium text-sm">Size: {`S`}</span>
        </div>
      </div>
      <div
        onClick={() => {}}
        className="cursor-pointer flex flex-col justify-end text-[26px] text-red-500 transition-all duration-200 opacity-60 hover:opacity-100"
      >
        <MdDeleteOutline />
      </div>
    </div>
  );
};

export default CartItem;
