import DropdownButton, {
  Option,
} from "@components/dropdownButton/DropdownButton";
import OrderDetailModal from "@components/modals/OrderDetailModal";
import { OrderStatusBadge } from "@components/order";
import { SearchInputComponent } from "@components/search";
import {
  useCancelOrderMutation,
  useGetOrdersByUserIdQuery,
} from "@services/orderApi";

import { OrderDto } from "@types-d/order";
import { formatDateTime, formatPrice } from "@utils/format";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { OrderCancelModel } from "@components/modals";

const sortOptions: Option[] = [
  {
    id: "newest", // Sắp xếp đơn hàng mới nhất trước
    label: "Mới nhất",
  },
  {
    id: "oldest", // Sắp xếp đơn hàng cũ nhất trước
    label: "Cũ nhất",
  },
  {
    id: "lowest-price", // Sắp xếp theo giá thấp nhất trước
    label: "Giá thấp nhất",
  },
  {
    id: "highest-price", // Sắp xếp theo giá cao nhất trước
    label: "Giá cao nhất",
  },
];

const OrderPage = () => {
  const [sortCurrent, setSortCurrent] = useState(sortOptions[0].id);
  const [searchOrder, setSearchOrder] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { data: orders, isLoading } = useGetOrdersByUserIdQuery({
    OrderBy: sortCurrent,
    SearchTerm: searchOrder,
  });

  const [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async (reason: string) => {
    await cancelOrder({
      id: selectedOrder?.id!,
      orderForCancelDto: {
        cancellationReason: reason,
      },
    }).unwrap();

    setSelectedOrder(null);
  };

  const handleSearchOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchOrder(event.target.value);
  };

  return (
    <div className="mt-[50px]">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium">Đơn hàng của tôi</h1>
        <div className="flex items-center gap-6">
          <div className="hidden xl:block">
            <SearchInputComponent
              icon={<CiSearch />}
              onChange={(e) => handleSearchOrderChange(e)}
              onSeachClick={() => alert("Đang tìm kiếm...")}
              placeholder="Tìm kiếm"
              value={searchOrder}
            />
          </div>
          <DropdownButton
            options={sortOptions}
            currentOption={sortCurrent}
            defaultOption={sortOptions[0]}
            onOptionSelect={(option) => setSortCurrent(option.id)}
          />
        </div>
      </div>

      {/* Tìm kiếm */}
      <div className="pt-4 xl:hidden">
        <SearchInputComponent
          icon={<CiSearch />}
          onChange={(e) => handleSearchOrderChange(e)}
          onSeachClick={() => alert("Đang tìm kiếm...")}
          placeholder="Tìm kiếm"
          value={searchOrder}
        />
      </div>

      {/* Danh sách đơn hàng */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : orders?.data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 text-lg">
            Không tìm thấy đơn hàng nào
          </div>
        </div>
      ) : (
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Mã đơn hàng
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Tên người nhận
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Ngày đặt hàng
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.data?.map((orderDetail) => (
                  <tr
                    key={orderDetail.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        #{orderDetail.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium">
                        {orderDetail.shippingAddress.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {formatDateTime(orderDetail.createdAt.toString())}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium">
                        {formatPrice(orderDetail.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={orderDetail.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        onClick={() => setSelectedOrder(orderDetail)}
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedOrder && (
        <>
          <OrderDetailModal
            open={!!selectedOrder}
            onClose={() => setSelectedOrder(null)}
            order={selectedOrder}
            onCancelOrder={() => setShowCancelModal(true)}
          />
        </>
      )}

      <OrderCancelModel
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirmCancel={handleCancelOrder}
        orderId={selectedOrder?.id ?? 0}
      />
    </div>
  );
};

export default OrderPage;
