import { OrderStatus } from "@types-d/enums";

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Pending:
      return {
        label: "Pending",
        color: "#FF9800",
        bgColor: "#FFF3E0",
      };
    case OrderStatus.Confirmed:
      return {
        label: "Confirmed",
        color: "#2196F3",
        bgColor: "#E3F2FD",
      };
    case OrderStatus.Processing:
      return {
        label: "Processing",
        color: "#673AB7",
        bgColor: "#EDE7F6",
      };
    case OrderStatus.Shipped:
      return {
        label: "Shipped",
        color: "#00BCD4",
        bgColor: "#E0F7FA",
      };
    case OrderStatus.Delivered:
      return {
        label: "Delivered",
        color: "#4CAF50",
        bgColor: "#E8F5E9",
      };
    case OrderStatus.Cancelled:
      return {
        label: "Cancelled",
        color: "#F44336",
        bgColor: "#FFEBEE",
      };
    case OrderStatus.Refunded:
      return {
        label: "Refunded",
        color: "#795548",
        bgColor: "#EFEBE9",
      };
    case OrderStatus.Failed:
      return {
        label: "Failed",
        color: "#D32F2F",
        bgColor: "#FFCDD2",
      };
    default:
      return {
        label: "Unknown",
        color: "#9E9E9E",
        bgColor: "#F5F5F5",
      };
  }
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = getStatusConfig(status);

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

export default OrderStatusBadge;
