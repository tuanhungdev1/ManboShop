import { OrderStatus } from "@types-d/enums";

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Pending:
      return {
        label: "Chờ xác nhận",
        color: "#FF9800",
        bgColor: "#FFF3E0",
      };
    case OrderStatus.Confirmed:
      return {
        label: "Đã xác nhận",
        color: "#2196F3",
        bgColor: "#E3F2FD",
      };
    case OrderStatus.Processing:
      return {
        label: "Đang xử lý",
        color: "#673AB7",
        bgColor: "#EDE7F6",
      };
    case OrderStatus.Shipped:
      return {
        label: "Đã giao cho đơn vị vận chuyển",
        color: "#00BCD4",
        bgColor: "#E0F7FA",
      };
    case OrderStatus.Delivered:
      return {
        label: "Đã giao hàng",
        color: "#4CAF50",
        bgColor: "#E8F5E9",
      };
    case OrderStatus.Cancelled:
      return {
        label: "Đã hủy",
        color: "#F44336",
        bgColor: "#FFEBEE",
      };
    case OrderStatus.Refunded:
      return {
        label: "Đã hoàn tiền",
        color: "#795548",
        bgColor: "#EFEBE9",
      };
    case OrderStatus.Failed:
      return {
        label: "Thanh toán thất bại",
        color: "#D32F2F",
        bgColor: "#FFCDD2",
      };
    default:
      return {
        label: "Không xác định",
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
