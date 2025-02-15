import { PaymentStatus } from "@types-d/enums";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

const getPaymentStatusConfig = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.Pending:
      return {
        label: "Chờ thanh toán",
        color: "#FF9800",
        bgColor: "#FFF3E0",
      };
    case PaymentStatus.Paid:
      return {
        label: "Đã thanh toán",
        color: "#4CAF50",
        bgColor: "#E8F5E9",
      };
    case PaymentStatus.Failed:
      return {
        label: "Thanh toán thất bại",
        color: "#D32F2F",
        bgColor: "#FFCDD2",
      };
    case PaymentStatus.Refunded:
      return {
        label: "Đã hoàn tiền",
        color: "#795548",
        bgColor: "#EFEBE9",
      };
    default:
      return {
        label: "Không xác định",
        color: "#9E9E9E",
        bgColor: "#F5F5F5",
      };
  }
};

const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const config = getPaymentStatusConfig(status);

  return (
    <div
      className="px-3 py-1 rounded-full text-sm font-medium inline-block"
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
      }}
    >
      {config.label}
    </div>
  );
};

export default PaymentStatusBadge;
