import { Tooltip } from "@mui/material";
import { PaymentMethod } from "@types-d/enums";

type PaymentMethodBadgeProps = {
  paymentMethod: PaymentMethod;
};

const getPaymentMethodConfig = (paymentMethod: PaymentMethod) => {
  switch (paymentMethod) {
    case PaymentMethod.COD:
      return {
        label: "COD",
        imageUrl:
          "https://static.vecteezy.com/system/resources/previews/020/574/330/large_2x/cash-on-delivery-badge-pack-free-png.png",
      };
    case PaymentMethod.ZaloPay:
      return {
        label: "Zalo Pay",
        imageUrl:
          "https://th.bing.com/th/id/R.c26a4e08690ab99de5f12ca637f01dfa?rik=NxcFxZe%2bT9vZ4g&pid=ImgRaw&r=0",
      };
    case PaymentMethod.VNPay:
      return {
        label: "VN Pay",
        imageUrl:
          "https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg",
      };
    default:
      return {
        label: "Unknown",
        imageUrl: "",
      };
  }
};

const PaymentMethodBadge = ({ paymentMethod }: PaymentMethodBadgeProps) => {
  const config = getPaymentMethodConfig(paymentMethod);

  return (
    <div className="px-3 py-1 rounded-full text-sm font-medium inline-block">
      <Tooltip title={config.label}>
        <div>
          <img
            src={config.imageUrl}
            alt={config.label}
            width={50}
            className="object-cover"
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default PaymentMethodBadge;
