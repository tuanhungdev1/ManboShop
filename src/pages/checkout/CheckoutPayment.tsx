import { PaymentMethodCard } from "@components/payment";
import { TextField } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { setNote, setPaymentMethod } from "@redux/slices/checkoutSlice";
import { RootState } from "@redux/store";
import { PaymentMethod } from "@types-d/enums";
import { useDispatch } from "react-redux";

const CheckoutPayment: React.FC = () => {
  const dispatch = useDispatch();
  const { paymentMethod } = useAppSelector(
    (state: RootState) => state.checkout
  );

  const paymentMethods = [
    { id: PaymentMethod.COD, label: "Cash on Delivery", icon: "cod-icon" },
    { id: PaymentMethod.ZaloPay, label: "ZaloPay", icon: "zalopay-icon" },
    { id: PaymentMethod.VNPay, label: "VNPay", icon: "vnpay-icon" },
  ];

  return (
    <div className="checkout-payment rounded-lg select-none">
      <h2 className="text-xl font-bold text-black mb-8">
        Chọn phương thức thanh toán
      </h2>

      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            selected={paymentMethod === method.id}
            onSelect={() => dispatch(setPaymentMethod(method.id))}
          />
        ))}
      </div>

      <div className="flex flex-col text-black text-sm gap-2 mt-8">
        <span className="font-medium">Ghi chú</span>
        <TextField
          multiline
          rows={4}
          spellCheck={false}
          onChange={(e) => dispatch(setNote(e.target.value))}
          className="mt-4 w-full rounded-lg placeholder:text-sm"
          placeholder="Ghi chú cho đơn hàng..."
        />
      </div>
    </div>
  );
};

export default CheckoutPayment;
