// src/components/CartSummary.tsx
import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { formatPrice } from "@utils/format";

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
  const grandTotal = subtotal + deliveryCharge - discount;

  return (
    <Box p={2} border="1px solid #e0e0e0" borderRadius={2}>
      <div className="flex items-center pt-2 pb-4 border-b justify-between text-[16px] font-semibold">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="pt-2 pb-4 border-b">
        <TextField
          label="Enter Discount Code"
          variant="outlined"
          fullWidth
          size="small"
          sx={{ my: 2 }}
        />
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          fullWidth
          size="large"
          onClick={() => onApplyDiscount("FLAT50")}
        >
          Apply
        </Button>
        <div className="flex items-center justify-between pt-4 text-[14px] font-medium">
          <span>Delivery Charge</span>
          <span>{formatPrice(deliveryCharge)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 text-[16px] font-semibold">
        <span>Grand Total</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, textTransform: "none" }}
        size="large"
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default ShoppingCartSummary;
