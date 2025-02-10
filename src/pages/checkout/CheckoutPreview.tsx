import { CartItemSkeleton } from "@components/cartItem";
import { OrderItemForCreateOrder } from "@components/order";
import { useAppSelector } from "@redux/hooks";
import { selectCartItems, selectIsCartLoading } from "@redux/slices/cartSlice";
import {
  selectCheckoutSelectedAddressId,
  selectCheckoutPaymentMethod,
} from "@redux/slices/checkoutSlice";
import { getEstimatedDeliveryDate } from "@utils/format";

import { PaymentMethod } from "@types-d/enums";
import { TfiFaceSad } from "react-icons/tfi";
import { useGetUserAddressesQuery } from "@services/addressApi";

const CheckoutPreview = () => {
  const isLoading = useAppSelector(selectIsCartLoading);
  const cartItems = useAppSelector(selectCartItems);

  // Lấy địa chỉ & phương thức thanh toán từ Redux
  const selectedAddressId = useAppSelector(selectCheckoutSelectedAddressId);
  const paymentMethod = useAppSelector(selectCheckoutPaymentMethod);

  const { data: addresses, isLoading: isLoadingAddresses } =
    useGetUserAddressesQuery();

  // Lấy địa chỉ đã chọn hoặc địa chỉ mới
  const selectedAddress =
    addresses && addresses.data && selectedAddressId
      ? addresses?.data.find((addr) => addr.id === selectedAddressId)
      : null;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[...Array(6)].map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 h-[90%]">
        <div className="text-[60px] mb-6 opacity-50">
          <TfiFaceSad />
        </div>
        <p className="text-base font-medium text-gray-600">Giỏ hàng trống!</p>
      </div>
    );
  }

  return (
    <div className=" bg-white">
      {/* Estimated Delivery */}
      <h1 className="text-lg font-semibold mb-8">
        📦 Giao hàng dự kiến vào:{" "}
        <span className="text-yellow-600">{getEstimatedDeliveryDate()}</span>
      </h1>

      <h1 className="text-lg font-semibold mb-4">🛒 Danh sách sản phẩm</h1>

      {/* Products */}
      <div className="flex flex-col -mt-6">
        {cartItems.map((item, index) => (
          <OrderItemForCreateOrder key={index} cartItem={item} />
        ))}
      </div>

      {/* Shipping Address */}
      <div className="mt-6">
        {isLoadingAddresses ? (
          <div className="p-6 border rounded-md font-medium flex flex-col gap-2 text-black animate-pulse">
            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-5 w-full bg-gray-300 rounded"></div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">🏠 Địa chỉ nhận hàng</h2>
            {selectedAddress ? (
              <div className="p-6 border rounded-md  font-medium flex flex-col gap-2 text-black">
                <p className="text-xl font-bold">{selectedAddress!.name}</p>
                <p className="">{selectedAddress!.phoneNumber}</p>
                <p className="">{selectedAddress!.addressLine}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Chưa chọn địa chỉ nhận hàng
              </p>
            )}
          </>
        )}
      </div>

      {/* Payment Method */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">
          💳 Phương thức thanh toán
        </h2>
        {paymentMethod ? (
          <p className="p-6 border rounded-md text-gray-800 font-medium">
            {paymentMethod === PaymentMethod.COD
              ? "Thanh toán khi nhận hàng (COD)"
              : paymentMethod === PaymentMethod.ZaloPay
              ? "Thanh toán qua ZaloPay"
              : "Thanh toán qua VNPay"}
          </p>
        ) : (
          <p className="text-gray-500 italic">
            Chưa chọn phương thức thanh toán
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPreview;
