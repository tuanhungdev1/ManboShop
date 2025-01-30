import { CartItemComponent, CartItemSkeleton } from "@components/cartItem";
import { useAppSelector } from "@redux/hooks";
import {
  selectCartItems,
  selectCartTotalItems,
  selectIsCartLoading,
} from "@redux/slices/cartSlice";
import { TfiFaceSad } from "react-icons/tfi";

const CartList = () => {
  const isLoading = useAppSelector(selectIsCartLoading);
  const cartItems = useAppSelector(selectCartItems);
  const totalCount = useAppSelector(selectCartTotalItems);

  if (isLoading) {
    return (
      <div className={`flex flex-col gap-2`}>
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
    <>
      <div className="text-sm mt-4">
        Bạn có {totalCount} sản phẩm trong giỏ hàng
      </div>
      <div className={`flex flex-col`}>
        {cartItems.map((item, index) => (
          <CartItemComponent key={index} cartItem={item} />
        ))}
      </div>
    </>
  );
};

export default CartList;
