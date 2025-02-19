// src/components/CartSummary.tsx
import React from "react";
import { Box } from "@mui/material";
import { formatPrice } from "@utils/format";
import { ButtonComponent } from "@components/buttons";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  onApplyDiscount: (code: string) => void;
}

const ShoppingCartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  deliveryCharge,
  discount,
  onApplyDiscount,
}) => {
  const navigate = useNavigate();
  const grandTotal = subtotal + deliveryCharge - discount;

  const handleCheckoutProcessing = () => {
    navigate("/checkout/address");
  };

  return (
    <Box p={2} border="1px solid #e0e0e0" borderRadius={2}>
      <div className="flex items-center pt-2 pb-4 border-b justify-between text-[16px] font-semibold">
        <span>Tạm tính</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="pt-2 pb-4 border-b">
        <label
          className="text-[12px] mt-4 block cursor-pointer"
          htmlFor="discount-input"
        >
          Nhập mã giảm giá
        </label>
        <div className="flex items-stretch mt-2">
          <input
            id="discount-input"
            type="text"
            className="h-[54px] flex-1 cursor-pointer w-full border-[1px] placeholder:font-normal placeholder:text-sm  rounded-tr-none rounded-br-none border-black rounded-lg px-4 outline-none"
            placeholder="MÃ GIẢM GIÁ"
          />
          <ButtonComponent className="rounded-tl-none rounded-bl-none flex-1 w-[40%] border-[1px] border-black">
            Áp dụng
          </ButtonComponent>
        </div>

        <div className="flex items-center justify-between pt-4 text-[14px] font-medium">
          <span>Phí giao hàng</span>
          <span>{formatPrice(deliveryCharge)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 text-[16px] font-semibold">
        <span>Tổng cộng</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>

      <ButtonComponent
        className="w-full mt-4"
        onClick={handleCheckoutProcessing}
      >
        Tiến hành thanh toán
      </ButtonComponent>
    </Box>
  );
};

export default ShoppingCartSummary;
