import { CartItemSkeleton } from "@components/cartItem";
import CartItem from "@components/cartItem/CartItem";

const CartList = () => {
  if (false) {
    return (
      <div className={`flex flex-col gap-2`}>
        {[...Array(6)].map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col`}>
      {[...Array(6)].map((_, index) => (
        <CartItem key={index} />
      ))}
    </div>
  );
};

export default CartList;
