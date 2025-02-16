import { OrderDetail, OrderStatusBadge } from "@components/order";
import { Button, Modal } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/slices/authSlice";
import { OrderStatus } from "@types-d/enums";
import { OrderDto } from "@types-d/order";
import { formatDateTime, formatPrice } from "@utils/format";
import { getNamePaymentMethod } from "@utils/utils";
import { FcCancel } from "react-icons/fc";

interface OrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  order: OrderDto;
  onCancelOrder: () => void;
}

const CANCELABLE_STATUSES = [OrderStatus.Pending, OrderStatus.Confirmed];

const OrderDetailModal = ({
  open,
  onClose,
  order,
  onCancelOrder,
}: OrderDetailModalProps) => {
  const user = useAppSelector(selectUser);
  const canCancel = user?.roles.find((r) => r === "Admin")
    ? true
    : CANCELABLE_STATUSES.includes(order.status);

  const getOrderTimeline = (order: OrderDto) => {
    const timeline = [
      {
        status: "Đơn hàng đã đặt",
        date: order.createdAt,
        color: "bg-blue-500", // Xanh dương
      },
    ];

    if (order.confirmedAt) {
      timeline.push({
        status: "Đã xác nhận",
        date: order.confirmedAt,
        color: "bg-green-500", // Xanh lá
      });
    }

    if (order.processedAt) {
      timeline.push({
        status: "Đang xử lý",
        date: order.processedAt,
        color: "bg-yellow-500", // Vàng
      });
    }

    if (order.shippedAt) {
      timeline.push({
        status: "Đã giao cho đơn vị vận chuyển",
        date: order.shippedAt,
        color: "bg-orange-500", // Cam
      });
    }

    if (order.deliveredAt) {
      timeline.push({
        status: "Đã giao hàng",
        date: order.deliveredAt,
        color: "bg-gray-700", // Xanh đậm
      });
    }

    if (order.cancelledAt) {
      timeline.push({
        status: "Đã hủy",
        date: order.cancelledAt,
        color: "bg-red-500", // Đỏ
      });
    }

    return timeline;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Tiêu đề */}
        <div className="border-b px-6 py-4 flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-xl font-semibold">Đơn hàng #{order.id}</h2>
            <p className="text-sm text-gray-500">
              Đặt vào {formatDateTime(order.createdAt.toString())}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nội dung */}
        <div className="p-6">
          {/* Trạng thái đơn hàng và hành động */}
          <div className="flex items-center justify-between mb-6">
            <OrderStatusBadge status={order.status} />
            {canCancel && (
              <Button
                variant="outlined"
                color="error"
                onClick={onCancelOrder}
                startIcon={<FcCancel />}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Hủy đơn hàng
              </Button>
            )}
          </div>

          {/* Thông tin giao hàng và thanh toán */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Địa chỉ giao hàng</h3>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.phoneNumber}</p>
                <p>{order.shippingAddress.addressLine}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p>
                  {order.shippingAddress.country},{" "}
                  {order.shippingAddress.postalCode}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Chi tiết thanh toán</h3>
              <div className="text-sm text-gray-600">
                <p>
                  Phương thức thanh toán:{" "}
                  {getNamePaymentMethod(order.paymentMethod)}
                </p>
                {order.note && (
                  <div className="mt-2">
                    <p className="font-medium">Ghi chú đơn hàng:</p>
                    <p>{order.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="mb-6">
            <h3 className="font-medium mb-4">Sản phẩm trong đơn hàng</h3>
            <div className="space-y-4">
              {order.orderDetails.map((detail) => (
                <OrderDetail orderDetail={detail} />
              ))}
            </div>
          </div>

          {/* Tổng kết đơn hàng */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tạm tính</span>
                <span>{formatPrice(order.subTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Tổng cộng</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Dòng thời gian đơn hàng */}
          <div className="mt-8">
            <h3 className="font-medium mb-4">Tiến trình đơn hàng</h3>
            <div className="relative pl-4">
              {getOrderTimeline(order).map((event, index) => (
                <div key={index} className="flex items-start mb-4">
                  <div className="absolute left-0 w-px h-full bg-gray-200" />
                  <div className="flex items-center">
                    <div
                      className={`absolute left-0 w-2 h-2 -ml-1 ${event.color} rounded-full`}
                    />
                    <div className="ml-6">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(event.date.toString())}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chân trang */}
        <div className="border-t px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Cập nhật lần cuối:{" "}
              {formatDateTime(
                order.updatedAt?.toString() || order.createdAt.toString()
              )}
            </p>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                textTransform: "capitalize",
              }}
            >
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
